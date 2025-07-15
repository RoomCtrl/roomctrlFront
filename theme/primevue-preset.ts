import { definePreset } from '@primeuix/themes'
import Aura from '@primeuix/themes/aura'

const MyCustomPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#D74141',
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d',
      950: '#450a0a',
    },
    colorScheme: {
      light: {
        primary: {
          color: '#D74141',
          contrastColor: '#ffffff',
          hoverColor: '#FF0000',
          activeColor: '#FF0000',
        },
        surface: {
          0: '#ffffff',
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
      },
      dark: {
        primary: {
          color: '#D74141',
          contrastColor: '#ffffff',
          hoverColor: '#FF0000',
          activeColor: '#FF0000',
        },
        surface: {
          0: '#0f1419',
          50: '#1a1a1a',
          100: '#262626',
          200: '#404040',
          300: '#525252',
          400: '#737373',
          500: '#a3a3a3',
          600: '#d4d4d4',
          700: '#e5e5e5',
          800: '#f5f5f5',
          900: '#fafafa',
          950: '#1B2532',
        },
        content: {
          color: '#ffffff',
          hoverColor: '#f3f4f6',
          borderColor: '#404040',
          borderRadius: '6px',
        },
        text: {
          color: '#ffffff',
          hoverColor: '#f3f4f6',
          mutedColor: '#a3a3a3',
          hoverMutedColor: '#d4d4d4',
        },
      },
    },
  },
  components: {
    drawer: {
      colorScheme: {
        dark: {
          root: {
            background: '{surface.950}',
          },
        },
      },
    },
    select: {
      colorScheme: {
        dark: {
          root: {
            background: '#0f1419',
            color: '#ffffff',
            borderColor: '#404040',
          },
          overlay: {
            background: '#262626',
            borderColor: '#404040',
          },
          option: {
            color: '#ffffff',
            focusBackground: '#404040',
            selectedBackground: '#D74141',
            selectedColor: '#ffffff',
          },
        },
      },
    },
    card: {
      colorScheme: {
        dark: {
          root: {
            background: '{surface.100}',
            color: '{text.color}',
          },
        },
      },
    },
    inputtext: {
      colorScheme: {
        dark: {
          root: {
            background: '{surface.950}',
            color: '{text.color}',
            borderColor: '{content.borderColor}',
          },
        },
      },
    },
    textarea: {
      colorScheme: {
        dark: {
          root: {
            borderColor: '{content.borderColor}',
          },
        },
      },
    },
    dropdown: {
      colorScheme: {
        dark: {
          root: {
            background: '{surface.100}',
            color: '{text.color}',
            borderColor: '{content.borderColor}',
          },
          focus: {
            borderColor: '{primary.color}',
            boxShadow: '0 0 0 1px {primary.color}',
          },
          panel: {
            background: '{surface.100}',
            borderColor: '{content.borderColor}',
          },
          item: {
            color: '{text.color}',
            hoverBackground: '{surface.200}',
          },
        },
      },
    },
    datatable: {
      colorScheme: {
        dark: {
          row: {
            background: '{surface.100}',
            color: '{text.color}',
            hoverBackground: '{surface.200}',
          },
        },
      },
    },
    menubar: {
      colorScheme: {
        dark: {
          root: {
            background: '{surface.100}',
            borderColor: '{content.borderColor}',
          },
          item: {
            color: '{text.color}',
          },
        },
      },
    },
    dialog: {
      colorScheme: {
        dark: {
          root: {
            background: '{surface.100}',
            color: '{text.color}',
          },
        },
      },
    },
    panel: {
      colorScheme: {
        dark: {
          root: {
            background: '{surface.100}',
            color: '{text.color}',
          },
        },
      },
    },
    divider: {
      colorScheme: {
        light: {
          root: {
            borderColor: '{surface.300}',
          },
        },
        dark: {
          root: {
            borderColor: '{surface.400}',
          },
        },
      },
    },
  },
})

export default MyCustomPreset
