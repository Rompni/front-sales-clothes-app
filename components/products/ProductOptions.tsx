import { FunctionComponent, memo } from 'react';
// import Swatch from './Swatch';

const ProductOptions: FunctionComponent<any> = memo(() => {
  return (
    <div>
      {/* options.map((opt: { displayName: string; values: any[]; id: any }) => (
        <div className="pb-4" key={opt.displayName}>
          <h2 className="uppercase font-medium text-sm tracking-wide">
            {opt.displayName}
          </h2>
          <div className="flex flex-row py-4">
            {opt.values.map((v, i: number) => {
              const active = selectedOptions[opt.displayName.toLowerCase()];
              return (
                <Swatch
                  key={`${opt.id}-${i}`}
                  active={v.label.toLowerCase() === active}
                  variant={opt.displayName}
                  color={v.hexColors ? v.hexColors[0] : ''}
                  label={v.label}
                  onClick={() => {
                    setSelectedOptions((selectedOptions) => {
                      return {
                        ...selectedOptions,
                        [opt.displayName.toLowerCase()]: v.label.toLowerCase(),
                      };
                    });
                  }}
                />
              );
            })}
          </div>
        </div>
      )) */}
    </div>
  );
});

ProductOptions.displayName = 'ProductOptions';

export default ProductOptions;
