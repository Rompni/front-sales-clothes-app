import { FunctionComponent, Fragment, useContext, useState } from 'react';
import { Popover, Transition } from '@headlessui/react';
import Image from 'next/Image';
import { locales, UserContext } from '../context/UserContext';
import { useTranslation } from 'react-i18next';

const I18nWidget: FunctionComponent = (): JSX.Element => {
  const { setLocale } = useContext(UserContext);
  const { i18n } = useTranslation();
  const [lang, setLang] = useState<number>(i18n.language === 'es' ? 0 : 1);

  const handleLocaleChange = (language: string) => {
    if (!window) {
      return;
    }
    // Only English Spanish
    if (lang === 1) setLang(0);
    else setLang(1);

    localStorage.setItem('lang', language); // This line saves the language option!
    setLocale(language);
    i18n.changeLanguage(language);
  };

  return (
    <Popover className="text-center items-center rounded-full border w-7 h-7">
      {({ open }) => (
        <>
          <Popover.Button
            className={`${
              open ? '' : 'text-opacity-90'
            } duration-150 ease-in-out  transform scale-100 hover:scale-120 active:scale-120 `}
          >
            <span key={locales[lang].name}>
              <div className="flex justify-center text-white">
                <Image
                  width="22"
                  height="26"
                  src={`/${locales[lang].img.filename}`}
                  alt={locales[lang].img.alt}
                />
              </div>
            </span>
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute z-10 w-max transform -translate-x-1/2 left-1/2 ">
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="relative grid gap-1 bg-white p-2 lg:grid-cols-1">
                  {locales.map((item) => (
                    <span
                      key={item.name}
                      className="flex items-center transition duration-150 ease-in-out rounded-lg hover:bg-accent-2 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                      onClick={() => handleLocaleChange(item.name)}
                    >
                      <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 text-white">
                        <Image
                          width="20"
                          height="20"
                          className="block mr-2 w-5"
                          src={`/${item.img.filename}`}
                          alt={item.img.alt}
                        />
                      </div>
                      <div className="ml-2 mr-2">
                        <p className="text-sm font-medium text-gray-900">
                          {item.name}
                        </p>
                      </div>
                    </span>
                  ))}
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default I18nWidget;
