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
        },
        text: {
          color: '#000000ff',
          focusColor: '#ffffff',
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
          100: '#262626',
          150: '#404040',
          200: '#36475eff',
          250: '#D74141',
        },
        content: {
          color: '#ffffff',
          hoverColor: '#f3f4f6',
          borderColor: '#404040',
          focusBorderColor: '#ffffff',
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
    accordion: {
      colorScheme: {
        dark: {
          header: {
            background: '{surface.50}',
            activeBackground: '{surface.50}',
            activeHoverBackground: '{surface.50}',
            hoverBackground: '{surface.50}',
            color: '{text.color}',
            hoverColor: '{text.color}',
            activeColor: '{text.color}',
            activeHoverColor: '{text.color}',
          },
          content: {
            background: '{surface.200}',
            color: '{text.color}',
          },
        },
        light: {
          header: {
            background: '#e5e5e5',
            activeBackground: '#e5e5e5',
            activeHoverBackground: '#e5e5e5',
            hoverBackground: '#e5e5e5',
            color: '{text.color}',
            hoverColor: '{text.color}',
            activeColor: '{text.color}',
            activeHoverColor: '{text.color}',
          },
          content: {
            background: '#f5f5f5',
            color: '{text.color}',
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
            color: '{text.color}',
          },
        },
      },
    },
    button: {
      colorScheme: {
        light: {
          root: {
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
        light: {
          root: {
            color: '#000000ff',
          },
        },
      },
    },
    chip: {
      colorScheme: {
        dark: {
          root: {
            color: '{text.focusColor}',
          },
        },
        light: {
          root: {
            color: '{text.focusColor}',
          },
        },
      },
    },
    datatable: {
      colorScheme: {
        dark: {
          headerCell: {
            selectedBackground: '{surface.250}',
          },
          row: {
            background: '{surface.100}',
            color: '{text.color}',
          },
        },
        light: {
          root: {
            borderColor: '{text.focusColor}',
          },
          headerCell: {
            hoverColor: '{text.focusColor}',
            selectedBackground: '{surface.100}',
            selectedColor: '{text.focusColor}',
          },
          sortIcon: {
            hoverColor: '{text.focusColor}',
          },
        },
      },
    },
    dataview: {
      colorScheme: {
        light: {
          content: {
            background: '{surface.50}',
          },
        },
      },
    },
    datepicker: {
      colorScheme: {
        dark: {
          dropdown: {
            background: '{surface.250}',
            hoverColor: '{surface.250}',
          },
          date: {
            hoverBackground: '{surface.250}',
            rangeSelectedBackground: '{surface.250}',
          },
          today: {
            color: '{text.color}',
          },
        },
        light: {
          dropdown: {
            color: '{text.focusColor}',
          },
          date: {
            hoverColor: '{text.focusColor}',
            rangeSelectedBackground: '{surface.100}',
            rangeSelectedColor: '{text.focusColor}',
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
    divider: {
      colorScheme: {
        light: {
          root: {
            borderColor: '{surface.300}',
          },
        },
        dark: {
          root: {
            borderColor: '{content.color}',
          },
        },
      },
    },
    drawer: {
      colorScheme: {
        dark: {
          root: {
            borderColor: '{surface.50}',
            background: '{surface.50}',
            color: '{text.color}',
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
            hoverBackground: '{surface.250}',
          },
        },
      },
    },
    floatlabel: {
      colorScheme: {
        dark: {
          root: {
            focusColor: '{text.color}',
          },
          on: {
            active: {
              background: '{surface.50}',
            },
          },
        },
        light: {
          root: {
            focusColor: '{text.color}',
          },
        },
      },
    },
    inputtext: {
      colorScheme: {
        dark: {
          root: {
            background: '{surface.50}',
            borderColor: '{content.borderColor}',
            focusBorderColor: '{text.color}',
            color: '{text.color}',
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
            color: '{text.color}',
            focusColor: '{surface.50}',
            focusBackground: '{surface.250}',
          },
        },
        light: {
          item: {
            focusColor: '{text.focusColor}',
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
            borderColor: '{content.borderColor}',
          },
          item: {
            color: '{text.color}',
          },
        },
      },
    },
    multiselect: {
      colorScheme: {
        dark: {
          root: {
            color: '{text.color}',
            borderColor: '{content.borderColor}',
            focusBorderColor: '{content.focusBorderColor}',
            background: '{surface.50}',
          },
          overlay: {
            background: '{surface.50}',
            borderColor: '{content.borderColor}',
          },
          option: {
            color: '{text.color}',
            focusColor: '{text.color}',
            focusBackground: '{surface.200}',
            selectedBackground: '{surface.250}',
            selectedColor: '{text.color}',
            selectedFocusBackground: '{surface.250}',
          },
        },
        light: {
          root: {
            color: '{text.color}',
            focusBorderColor: '{surface.150}',
          },
          option: {
            color: '{text.color}',
            focusColor: '{text.focusColor}',
            focusBackground: '{surface.100}',
            selectedBackground: '{surface.100}',
            selectedColor: '{text.focusColor}',
            selectedFocusBackground: '{surface.100}',
            selectedFocusColor: '{text.focusColor}',
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
          header: {
            color: '{text.color}',
          },
        },
      },
    },
    popover: {
      colorScheme: {
        dark: {
          root: {
            color: '{text.color}',
            background: '{surface.50}',
          },
        },
      },
    },
    select: {
      colorScheme: {
        dark: {
          root: {
            color: '{text.color}',
            borderColor: '{content.borderColor}',
            focusBorderColor: '{content.focusBorderColor}',
            background: '{surface.50}',
          },
          overlay: {
            background: '{surface.50}',
            borderColor: '{content.borderColor}',
          },
          option: {
            color: '{text.color}',
            focusColor: '{text.color}',
            focusBackground: '{surface.200}',
            selectedBackground: '{surface.250}',
            selectedColor: '{text.color}',
            selectedFocusBackground: '{surface.250}',
          },
        },
        light: {
          root: {
            color: '{text.color}',
            focusBorderColor: '{surface.150}',
          },
          option: {
            color: '{text.color}',
            focusColor: '{text.focusColor}',
            focusBackground: '{surface.100}',
            selectedBackground: '{surface.100}',
            selectedColor: '{text.focusColor}',
            selectedFocusBackground: '{surface.100}',
            selectedFocusColor: '{text.focusColor}',
          },
        },
      },
    },
    textarea: {
      colorScheme: {
        dark: {
          root: {
            color: '{text.color}',
            borderColor: '{content.borderColor}',
            focusBorderColor: '{text.color}',
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
            detailColor: '{text.color}',
          },
          info: {
            detailColor: '{text.color}',
          },
          error: {
            detailColor: '{text.color}',
          },
        },
      },
    },
    toggleswitch: {
      colorScheme: {
        dark: {
          root: {
            checkedHoverBackground: '#dd5252ff',
          },
          handle: {
            checkedBackground: '{surface.50}',
            checkedHoverBackground: '{surface.50}',
          },
        },
      },
    },
    tooltip: {
      colorScheme: {
        dark: {
          root: {
            background: '{surface.0}',
            color: '{text.color}',
          },
        },
        light: {
          root: {
            background: '{surface.100}',
            color: '{text.focusColor}',
          },
        },
      },
    },
    password: {
      colorScheme: {
        dark: {
          icon: {
            color: '{text.color}',
          },
        },
      },
    },
    inputgroup: {
      colorScheme: {
        dark: {
          addon: {
            color: '{text.color}',
          },
        },
      },
    },
  },
})

export default MyCustomPreset
