import { useEffect, useMemo, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Country, City } from "country-state-city";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type SearchSelectProps = {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  placeholder: string;
  searchPlaceholder?: string;
  emptyText?: string;
  disabled?: boolean;
  triggerClassName?: string;
  id?: string;
  ariaLabel?: string;
};

export function SearchSelect({
  value,
  onChange,
  options,
  placeholder,
  searchPlaceholder = "Search...",
  emptyText = "No results.",
  disabled,
  triggerClassName,
  id,
  ariaLabel,
}: SearchSelectProps) {
  const [open, setOpen] = useState(false);
  const selected = options.find((o) => o.value === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id={id}
          type="button"
          variant="outline"
          role="combobox"
          aria-label={ariaLabel ?? placeholder}
          aria-expanded={open}
          disabled={disabled}
          className={cn(
            "w-full justify-between font-normal",
            !selected && "text-muted-foreground",
            triggerClassName,
          )}
        >
          <span className="truncate">{selected ? selected.label : placeholder}</span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0 z-50" align="start">
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            <CommandEmpty>{emptyText}</CommandEmpty>
            <CommandGroup>
              {options.map((opt) => (
                <CommandItem
                  key={opt.value}
                  value={opt.label}
                  onSelect={() => {
                    onChange(opt.value);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === opt.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {opt.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

// --- Country / City / Dial-code data helpers -------------------------------

const allCountries = Country.getAllCountries()
  .map((c) => ({ value: c.isoCode, label: c.name, phonecode: c.phonecode }))
  .sort((a, b) => a.label.localeCompare(b.label));

export const countryOptions = allCountries.map(({ value, label }) => ({ value, label }));

// Dial-code dropdown: ONLY the +code is shown. Uniqueness by code; search-value is the
// country name so users can still find their code by typing their country.
const dialSeen = new Set<string>();
export const dialCodeOptions = allCountries
  .map((c) => {
    const raw = (c.phonecode || "").replace(/^\+/, "").trim();
    if (!raw) return null;
    const code = raw.startsWith("1") ? "+1" : `+${raw}`;
    return { code, country: c.label };
  })
  .filter((x): x is { code: string; country: string } => !!x)
  .sort((a, b) => {
    const na = parseInt(a.code.slice(1), 10);
    const nb = parseInt(b.code.slice(1), 10);
    if (na !== nb) return na - nb;
    return a.country.localeCompare(b.country);
  })
  .filter((x) => {
    if (dialSeen.has(x.code)) return false;
    dialSeen.add(x.code);
    return true;
  })
  .map((x) => ({ value: x.code, label: x.code, searchLabel: `${x.code} ${x.country}` }));

export function useCityOptions(countryIso: string) {
  return useMemo(() => {
    if (!countryIso) return [];
    const cities = City.getCitiesOfCountry(countryIso) ?? [];
    // De-dupe by name (some entries repeat across states)
    const seen = new Set<string>();
    const list: { value: string; label: string }[] = [];
    for (const c of cities) {
      if (seen.has(c.name)) continue;
      seen.add(c.name);
      list.push({ value: c.name, label: c.name });
    }
    return list.sort((a, b) => a.label.localeCompare(b.label));
  }, [countryIso]);
}

// --- Compound field: dial-code + phone -------------------------------------

type PhoneProps = {
  dialCode: string;
  phone: string;
  onDialCodeChange: (v: string) => void;
  onPhoneChange: (v: string) => void;
  placeholder?: string;
  id?: string;
  className?: string;
};

export function DialCodePhoneInput({
  dialCode,
  phone,
  onDialCodeChange,
  onPhoneChange,
  placeholder = "Phone number",
  id,
  className,
}: PhoneProps) {
  return (
    <div className={cn("flex gap-2", className)}>
      <div className="w-28 shrink-0">
        <SearchSelectDial value={dialCode} onChange={onDialCodeChange} />
      </div>
      <input
        id={id}
        type="tel"
        inputMode="tel"
        value={phone}
        onChange={(e) => onPhoneChange(e.target.value.replace(/[^0-9\s\-()]/g, ""))}
        placeholder={placeholder}
        maxLength={20}
        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      />
    </div>
  );
}

// Specialised dial-code select that searches by country but renders only the +code
function SearchSelectDial({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const selected = dialCodeOptions.find((o) => o.value === value);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          role="combobox"
          aria-label="Dial code"
          aria-expanded={open}
          className={cn(
            "w-full justify-between font-normal px-3",
            !selected && "text-muted-foreground",
          )}
        >
          <span className="truncate">{selected ? selected.label : "Code"}</span>
          <ChevronsUpDown className="ml-1 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-0 z-50" align="start">
        <Command
          filter={(itemValue, search) =>
            itemValue.toLowerCase().includes(search.toLowerCase()) ? 1 : 0
          }
        >
          <CommandInput placeholder="Search code or country..." />
          <CommandList>
            <CommandEmpty>No code found.</CommandEmpty>
            <CommandGroup>
              {dialCodeOptions.map((opt) => (
                <CommandItem
                  key={opt.searchLabel}
                  value={opt.searchLabel}
                  onSelect={() => {
                    onChange(opt.value);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === opt.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {opt.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

// Convenience hook: when country changes, clear city
export function useClearCityOnCountryChange(country: string, setCity: (v: string) => void) {
  useEffect(() => {
    setCity("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [country]);
}
