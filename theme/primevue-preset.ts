import { definePreset } from '@primeuix/themes'
import Aura from '@primeuix/themes/aura'

const MyCustomPreset = definePreset(Aura, {
  semantic: {
    primary: '#D74141',
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
          50: '{gray.100}',
          100: '#D74141',
          150: '#000000ff',
          // 50: '#f8fafc',
          // 100: '#f1f5f9',
          // 200: '#e2e8f0',
          // 300: '#cbd5e1',
          // 400: '#94a3b8',
          // 500: '#64748b',
          // 600: '#475569',
          // 700: '#334155',
          // 800: '#1e293b',
          // 900: '#0f172a',
          // 950: '#020617',
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
          50: '#1B2532',
          // 100: '#262626',
          100: '#413e3eff',
          150: '#404040',
          200: '#36475eff',
          250: '#D74141',
        },
        contentDark: {
          color: '#ffffff',
          hoverColor: '#f3f4f6',
          borderColor: '#404040',
          focusBorderColor: '#ffffff',
          borderRadius: '6px',
        },
        textDark: {
          color: '#ffffff',
          hoverColor: '#f3f4f6',
          mutedColor: '#a3a3a3',
          hoverMutedColor: '#d4d4d4',
        },
        textLight: {
          color: '#000000ff',
          focusColor: '#ffffff',
        },
      },
    },
  },
  components: {
    accordion: {
      colorScheme: {
        dark: {
          header: {
            background: '{surface.50}',
            activeBackground: '{surface.50}',
            activeHoverBackground: '{surface.50}',
            hoverBackground: '{surface.50}',
            color: '{textDark.color}',
            hoverColor: '{textDark.color}',
            activeColor: '{textDark.color}',
            activeHoverColor: '{textDark.color}',
          },
          content: {
            background: '{surface.200}',
            color: '{textDark.color}',
          },
        },
        light: {
          header: {
            background: '#e5e5e5',
            activeBackground: '#e5e5e5',
            activeHoverBackground: '#e5e5e5',
            hoverBackground: '#e5e5e5',
            color: '{textLight.color}',
            hoverColor: '{textLight.color}',
            activeColor: '{textLight.color}',
            activeHoverColor: '{textLight.color}',
          },
          content: {
            background: '#f5f5f5',
            color: '{textLight.color}',
          },
        },
      },
      content: {
        padding: '2vh 2vw',
      },
    },
    avatar: {
      colorScheme: {
        dark: {
          root: {
            color: '{textDark.color}',
          },
        },
      },
    },
    card: {
      colorScheme: {
        dark: {
          root: {
            background: '{surface.100}',
            color: '{textDark.color}',
          },
        },
        light: {
          root: {
            color: '{textLight.color}',
          },
        },
      },
    },
    chip: {
      colorScheme: {
        dark: {
          root: {
            color: '{textLight.focusColor}',
          },
        },
      },
    },
    datatable: {
      colorScheme: {
        dark: {
          row: {
            background: '{surface.100}',
            color: '{textDark.color}',
          },
        },
      },
    },
    dialog: {
      colorScheme: {
        dark: {
          root: {
            background: '{surface.100}',
            color: '{textDark.color}',
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
            borderColor: '{contentDark.color}',
          },
        },
      },
    },
    drawer: {
      colorScheme: {
        dark: {
          root: {
            borderColor: '{surface.50}',
            background: '{surface.250}',
          },
        },
      },
    },
    dropdown: {
      colorScheme: {
        dark: {
          root: {
            background: '{surface.100}',
            color: '{textDark.color}',
            borderColor: '{contentDark.borderColor}',
          },
          focus: {
            borderColor: '{primary.color}',
            boxShadow: '0 0 0 1px {primary.color}',
          },
          panel: {
            background: '{surface.100}',
            borderColor: '{contentDark.borderColor}',
          },
          item: {
            color: '{textDark.color}',
            hoverBackground: '{surface.250}',
          },
        },
      },
    },
    floatlabel: {
      colorScheme: {
        dark: {
          root: {
            focusColor: '{textDark.color}',
          },
          on: {
            active: {
              background: '{surface.50}',
            },
          },
        },
        light: {
          root: {
            focusColor: '{textLight.focusColor}',
          },
        },
      },
    },
    inputtext: {
      colorScheme: {
        dark: {
          root: {
            background: '{surface.50}',
            borderColor: '{contentDark.borderColor}',
            focusBorderColor: '{textDark.color}',
            color: '{textDark.color}',
          },
        },
        light: {
          root: {
            focusBorderColor: '{surface.150}',
          },
        },
      },
    },
    menu: {
      colorScheme: {
        dark: {
          root: {
            background: '{surface.50}',
          },
          item: {
            color: '{textDark.color}',
            focusColor: '{surface.50}',
            focusBackground: '{surface.250}',
          },
        },
        light: {
          item: {
            focusColor: '{textLight.focusColor}',
            focusBackground: '{surface.100}',
          },
        },
      },
    },
    menubar: {
      colorScheme: {
        dark: {
          root: {
            background: '{surface.100}',
            borderColor: '{contentDark.borderColor}',
          },
          item: {
            color: '{textDark.color}',
          },
        },
      },
    },
    panel: {
      colorScheme: {
        dark: {
          root: {
            background: '{surface.100}',
            color: '{textDark.color}',
          },
        },
      },
    },
    popover: {
      colorScheme: {
        dark: {
          root: {
            background: '{surface.50}',
          },
        },
      },
    },
    select: {
      colorScheme: {
        dark: {
          root: {
            color: '{textDark.color}',
            borderColor: '{contentDark.borderColor}',
            focusBorderColor: '{contentDark.focusBorderColor}',
            background: '{surface.50}',
          },
          overlay: {
            background: '{surface.50}',
            borderColor: '{contentDark.borderColor}',
          },
          option: {
            color: '{textDark.color}',
            focusBackground: '{surface.150}',
            selectedBackground: '{surface.250}',
            selectedColor: '{textDark.color}',
            selectedFocusBackground: '{surface.250}',
          },
        },
        light: {
          root: {
            focusBorderColor: '{surface.150}',
          },
          option: {
            focusBackground: '#f5f5f5',
            selectedBackground: '{surface.100}',
            selectedColor: '{textLight.focusColor}',
            selectedFocusBackground: '{surface.100}',
          },
        },
      },
    },
    textarea: {
      colorScheme: {
        dark: {
          root: {
            color: '{textDark.color}',
            borderColor: '{contentDark.borderColor}',
            focusBorderColor: '{textDark.color}',
            background: '{surface.50}',
          },
        },
        light: {
          root: {
            focusBorderColor: '{surface.150}',
          },
        },
      },
    },
    toast: {
      colorScheme: {
        dark: {
          success: {
            detailColor: '{textDark.color}',
          },
        },
      },
    },
    toggleswitch: {
      colorScheme: {
        dark: {
          root: {
            checkedHoverBackground: '#dd3b3bff',
          },
          handle: {
            checkedBackground: '{surface.50}',
            checkedHoverBackground: '{surface.50}',
          },
        },
      },
    },
  },
})

export default MyCustomPreset
