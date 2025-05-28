# Brand Color Palette Generator

A simple Figma plugin that generates a complete 9-shade color palette from your brand color and creates variables in your local collections.

## Features

- **🎨 Brand Color Input**: Choose your brand color using a color picker or hex input
- **📁 Flexible Collection Options**: Use existing collections or create new ones
- **🌈 9-Shade Palette**: Automatically generates shades from 100 (lightest) to 900 (darkest)
- **🔄 Smart Updates**: Creates new variables or updates existing ones
- **✅ ES5 Compatible**: Works reliably in Figma's plugin environment

## How It Works

1. **Choose Your Brand Color**: Use the color picker or enter a hex value
2. **Select Collection Option**: Choose to use an existing collection or create a new one
3. **Generate Palette**: Click "Generate Color Palette" to create all 9 shades
4. **Use Your Variables**: Access your new color variables in Figma's design tools

## Generated Variables

The plugin creates variables with the naming pattern:

- `color/brand/100` (lightest)
- `color/brand/200`
- `color/brand/300`
- `color/brand/400`
- `color/brand/500` (your original brand color)
- `color/brand/600`
- `color/brand/700`
- `color/brand/800`
- `color/brand/900` (darkest)

## Technical Details

- **ES5 Compatibility**: All code uses ES5 syntax for maximum compatibility
- **Pure JavaScript**: No external dependencies - all color generation is built-in
- **Local Collections Only**: Works with your local variable collections
- **RGB Output**: Colors are stored in RGB format as required by Figma

## Installation

1. Copy the plugin files to your Figma plugins directory
2. Open Figma and go to Plugins → Development → Import plugin from manifest
3. Select the `manifest.json` file
4. The plugin will appear in your plugins menu

## Usage

1. Open the plugin from the Figma plugins menu
2. Choose your brand color using the color picker or hex input
3. Choose collection option:
   - **Use existing collection**: Select from your local collections
   - **Create new collection**: Enter a name for a new collection
4. Click "Generate Color Palette"
5. Your 9-shade palette will be created as variables in the selected or new collection

## Files

- `manifest.json` - Plugin configuration
- `code.js` - Main plugin logic with built-in color generation (ES5 compatible)
- `ui.html` - User interface with embedded CSS and JavaScript

## Requirements

- Figma desktop app or web version
- At least one local variable collection in your file

## Support

This plugin is designed to be simple and reliable. If you encounter any issues:

1. Ensure you have at least one local variable collection
2. Check that your brand color is a valid hex value
3. Try refreshing the plugin if it becomes unresponsive

The plugin will show success/error messages to guide you through the process.
