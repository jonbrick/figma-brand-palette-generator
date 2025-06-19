# Brand Color Palette Generator

> A Figma plugin that generates a complete 9-shade color palette from a single brand color and creates organized variables in your local collections.

![Plugin Preview](https://img.shields.io/badge/Figma-Plugin-blue?style=flat-square&logo=figma)
![ES5 Compatible](https://img.shields.io/badge/ES5-Compatible-green?style=flat-square)
![Version](https://img.shields.io/badge/version-1.0.0-orange?style=flat-square)

## ✨ Features

- **🎨 Smart Color Generation**: Transform any brand color into a professional 9-shade palette
- **📁 Flexible Collections**: Choose existing collections or create new ones on-the-fly
- **🌈 Consistent Naming**: Auto-generates variables with semantic naming (`color/brand/100` to `color/brand/900`)
- **🔄 Smart Updates**: Creates new variables or updates existing ones seamlessly
- **⚡ Pure JavaScript**: No external dependencies - all color calculations built-in
- **✅ Production Ready**: ES5 compatible for maximum reliability in Figma's environment

## 🚀 Quick Start

1. **Install the Plugin**

   - Download or clone this repository
   - In Figma: `Plugins` → `Development` → `Import plugin from manifest`
   - Select the `manifest.json` file

2. **Generate Your Palette**

   - Open the plugin from your plugins menu
   - Choose your brand color using the color picker or hex input
   - Select a target collection (existing or create new)
   - Click "Generate Color Palette"

3. **Use Your Variables**
   - Access your new color variables in Figma's design panel
   - Apply consistent colors across your entire design system

## 🎯 How It Works

The plugin uses advanced color theory to generate a harmonious palette:

### Input

```
Brand Color: #653EE8 (Your chosen color)
```

### Output Variables

```
color/brand/100  ← Lightest (90% lightness)
color/brand/200  ← Very light (80% lightness)
color/brand/300  ← Light (70% lightness)
color/brand/400  ← Medium light (60% lightness)
color/brand/500  ← Your original brand color
color/brand/600  ← Medium dark (40% lightness)
color/brand/700  ← Dark (30% lightness)
color/brand/800  ← Very dark (20% lightness)
color/brand/900  ← Darkest (10% lightness)
```

### Color Algorithm

- **Maintains hue consistency** across all shades
- **Intelligently adjusts saturation** for optimal contrast
- **Calculates precise lightness steps** for smooth gradation
- **Ensures accessibility** with proper contrast ratios

## 🛠️ Collection Management

### Use Existing Collection

- Select from any local variable collection in your file
- Variables are added to your chosen collection
- Existing variables with same names are updated

### Create New Collection

- Enter a custom collection name
- Plugin automatically creates the collection
- All 9 variables are added to the new collection

## 📁 File Structure

```
brand-color-palette-generator/
├── manifest.json          # Plugin configuration
├── code.js                # Main plugin logic (ES5 compatible)
├── ui.html                # User interface with embedded CSS/JS
└── README.md              # This documentation
```

## 🔧 Technical Details

### Requirements

- **Figma Version**: Desktop app or web version
- **Collections**: At least one local variable collection in your file
- **Browser**: Modern browser (Chrome, Firefox, Safari, Edge)

### Compatibility

- **ES5 Syntax**: All code uses ES5 for maximum compatibility
- **No Dependencies**: Pure JavaScript implementation
- **Local Variables**: Works exclusively with local collections
- **RGB Format**: Colors stored in RGB format as required by Figma

### Color Space Conversions

```javascript
HEX → RGB → HSL → Calculations → HSL → RGB → Figma Variables
```

## 🎨 Usage Examples

### Design System Setup

```
1. Choose your primary brand color: #653EE8
2. Generate 9-shade palette
3. Use variables for:
   - Backgrounds: color/brand/100, color/brand/200
   - Borders: color/brand/300, color/brand/400
   - Text: color/brand/700, color/brand/800, color/brand/900
   - Accents: color/brand/500, color/brand/600
```

### Component Theming

```
Button Primary:   color/brand/500
Button Hover:     color/brand/600
Button Disabled:  color/brand/300
Background:       color/brand/100
```

## 🚨 Troubleshooting

### Common Issues

**Plugin won't start**

- Ensure you have at least one local variable collection
- Try refreshing the plugin

**Colors look wrong**

- Verify your hex input is valid (e.g., #FF0000)
- Check that your brand color has sufficient contrast

**Variables not appearing**

- Refresh your Figma design panel
- Check the correct collection is selected

**ES5 Compatibility Errors**

- Plugin is fully ES5 compatible
- If issues persist, check browser console for errors

## 🤝 Contributing

This plugin is designed to be simple and reliable. For improvements:

1. **Test thoroughly** in Figma's environment
2. **Maintain ES5 compatibility** for all code
3. **Follow existing code patterns** for consistency
4. **Update tests** if adding new features

## 📝 License

This project is open source. Feel free to use, modify, and distribute according to your needs.

## 🔗 Resources

- [Figma Plugin API Documentation](https://www.figma.com/plugin-docs/)
- [Figma Variables Guide](https://help.figma.com/hc/en-us/articles/15339657135383-Guide-to-variables-in-Figma)
- [Color Theory Basics](https://www.interaction-design.org/literature/topics/color-theory)

---

**Made with ❤️ for the Figma design community**

_Transform any color into a complete design system in seconds._
