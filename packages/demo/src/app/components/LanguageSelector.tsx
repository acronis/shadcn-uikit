import * as React from 'react';
import { Check, Globe } from 'lucide-react';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@acronis-platform/shadcn-uikit/react';
import { cn } from '@acronis-platform/shadcn-uikit/react';
import { useLocale } from '../context/LocaleContext';

export function LanguageSelector() {
  const { currentLanguage, availableLanguages, changeLanguage, isLoading } = useLocale();
  const [isChanging, setIsChanging] = React.useState(false);

  const handleLanguageChange = async (languageCode: string) => {
    if (languageCode === currentLanguage) return;

    try {
      setIsChanging(true);
      await changeLanguage(languageCode);
    } catch (error) {
      console.error('Failed to change language:', error);
    } finally {
      setIsChanging(false);
    }
  };

  const _currentLang = availableLanguages.find(lang => lang.code === currentLanguage);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          disabled={isLoading || isChanging}
          className="relative"
        >
          <Globe className="h-5 w-5" />
          <span className="sr-only">Select language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {availableLanguages
          .filter(lang => lang.enabled)
          .map((language) => (
            <DropdownMenuItem
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className={cn(
                'flex items-center justify-between cursor-pointer',
                language.code === currentLanguage && 'bg-accent'
              )}
            >
              <div className="flex flex-col">
                <span className="font-medium">{language.nativeName}</span>
                <span className="text-xs text-muted-foreground">{language.name}</span>
              </div>
              {language.code === currentLanguage && (
                <Check className="h-4 w-4 text-primary" />
              )}
            </DropdownMenuItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
