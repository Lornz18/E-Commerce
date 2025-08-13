//mypreset.ts
import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';

export const MyPreset = definePreset(Aura, {
    //Your customizations, see the following sections for examples
    semantic: {
        colorScheme: {
            dark: {
                primary: {
                    50: '#636AE8',
                    100: '#636AE8',
                    200: '#636AE8',
                    300: '#636AE8',
                    400: '#636AE8',
                    500: '#636AE8',
                    600: '#636AE8',
                    700: '#636AE8',
                    800: '#636AE8',
                    900: '#636AE8',
                    950: '#636AE8'
                },
                surface: {
                    0: '{stone.950}',
                    50: '{stone.950}',
                    100: '{stone.900}',
                    200: '{stone.800}',
                    300: '{stone.700}',
                    400: '{stone.600}',
                    500: '{stone.500}',
                    600: '{stone.400}',
                    700: '{stone.300}',
                    800: '{stone.200}',
                    900: '{stone.100}',
                    950: '{stone.50}'
                }
            }
        }
    }
});