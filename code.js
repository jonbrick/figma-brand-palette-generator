// Brand Color Palette Generator Plugin
// ES5 Compatible - No modern JavaScript features

console.log("Brand Color Palette Generator plugin started");

// Show the UI
figma.showUI(__html__, { width: 400, height: 600 });

// Handle messages from UI
figma.ui.onmessage = function (msg) {
  console.log("Received message:", msg.type);

  if (msg.type === "get-collections") {
    handleGetCollections();
  } else if (msg.type === "generate-brand-colors") {
    handleBrandColorGeneration(
      msg.color,
      msg.collectionChoice,
      msg.collectionId,
      msg.collectionName
    );
  }
};

// Color generation functions (moved from brand-utils.js)
function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16) / 255,
        g: parseInt(result[2], 16) / 255,
        b: parseInt(result[3], 16) / 255,
      }
    : null;
}

function rgbToHsl(r, g, b) {
  var max = Math.max(r, g, b);
  var min = Math.min(r, g, b);
  var h,
    s,
    l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return { h: h * 360, s: s, l: l };
}

function hslToRgb(h, s, l) {
  h = h / 360;
  var r, g, b;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    function hue2rgb(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    }

    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return { r: r, g: g, b: b };
}

function generateBrandColors(hexColor) {
  var baseColor = hexToRgb(hexColor);
  if (!baseColor) {
    throw new Error("Invalid hex color");
  }

  var hsl = rgbToHsl(baseColor.r, baseColor.g, baseColor.b);
  var colors = {};

  // Generate 9 shades (100-900)
  for (var i = 1; i <= 9; i++) {
    var shade = i * 100;
    var newHsl = generateShade(hsl, shade);
    var rgb = hslToRgb(newHsl.h, newHsl.s, newHsl.l);
    colors[shade] = rgb;
  }

  return colors;
}

function generateShade(hsl, shade) {
  var h = hsl.h;
  var s = hsl.s;
  var l = hsl.l;

  var minS = 0.05;
  var maxS = 1.0;
  var lowerS = (s - minS) / 4;
  var upperS = (maxS - s) / 4;

  var minL = 0.05;
  var maxL = 0.98;
  var lowerL = (l - minL) / 4;
  var upperL = (maxL - l) / 4;

  var index = shade / 100;
  var newH, newS, newL;

  var isGray = s < 0.01; // Very low saturation means it's essentially gray

  if (isGray) {
    newH = h;
    newS = 0;
    if (index === 5) {
      newL = l;
    } else if (index < 5) {
      newL = getUpperValue(l, maxL, upperL, index);
    } else {
      newL = getLowerValue(l, minL, lowerL, 10 - index);
    }
  } else {
    newH = h;
    if (index === 5) {
      newS = s;
      newL = l;
    } else if (index < 5) {
      newS = getLowerValue(s, minS, lowerS, index);
      newL = getUpperValue(l, maxL, upperL, index);
    } else {
      newS = getUpperValue(s, maxS, upperS, 10 - index);
      newL = getLowerValue(l, minL, lowerL, 10 - index);
    }
  }

  return { h: newH, s: newS, l: newL };
}

function getLowerValue(val, min, increment, index) {
  if (val < min || index === 1) {
    return min;
  } else {
    return min + increment * (index - 1);
  }
}

function getUpperValue(val, max, increment, index) {
  if (val > max || index === 1) {
    return max;
  } else {
    return max - increment * (index - 1);
  }
}

function handleGetCollections() {
  try {
    console.log("Loading local collections...");

    var localCollections = [];
    var collections = figma.variables.getLocalVariableCollections();

    for (var i = 0; i < collections.length; i++) {
      var collection = collections[i];
      localCollections.push({
        id: collection.id,
        name: collection.name,
        modeCount: collection.modes.length,
      });
    }

    console.log("Found " + localCollections.length + " local collections");

    figma.ui.postMessage({
      type: "collections-loaded",
      success: true,
      localCollections: localCollections,
    });
  } catch (error) {
    console.error("Error loading collections:", error);
    figma.ui.postMessage({
      type: "collections-loaded",
      success: false,
      message: error.message,
    });
  }
}

function handleBrandColorGeneration(
  color,
  collectionChoice,
  collectionId,
  collectionName
) {
  try {
    console.log(
      "Starting brand color generation for:",
      color,
      "choice:",
      collectionChoice,
      "collection:",
      collectionId || collectionName
    );

    // Generate colors directly in the plugin
    var colors = generateBrandColors(color);

    // Get or create the target collection
    var targetCollectionId;
    if (collectionChoice === "existing") {
      targetCollectionId = collectionId;
    } else {
      // Create new collection
      var newCollection =
        figma.variables.createVariableCollection(collectionName);
      targetCollectionId = newCollection.id;
      console.log(
        "Created new collection:",
        collectionName,
        "with ID:",
        targetCollectionId
      );
    }

    // Create variables immediately
    var result = createBrandColorVariables(colors, targetCollectionId);

    figma.ui.postMessage({
      type: "brand-colors-complete",
      success: true,
      created: result.created,
      updated: result.updated,
      colors: colors,
      collectionName: collectionChoice === "new" ? collectionName : null,
      message: "Brand color palette generated successfully!",
    });
  } catch (error) {
    console.error("Error in brand color generation:", error);
    figma.ui.postMessage({
      type: "brand-colors-complete",
      success: false,
      message: error.message,
    });
  }
}

function createBrandColorVariables(colors, collectionId) {
  var created = [];
  var updated = [];

  // Find the target collection
  var targetCollection = null;
  var collections = figma.variables.getLocalVariableCollections();

  for (var i = 0; i < collections.length; i++) {
    if (collections[i].id === collectionId) {
      targetCollection = collections[i];
      break;
    }
  }

  if (!targetCollection) {
    throw new Error("Target collection not found");
  }

  console.log("Creating variables in collection:", targetCollection.name);

  // Get the first mode (we'll use the first available mode)
  var modeId = targetCollection.modes[0].modeId;

  // Create variables for each shade
  var shades = ["100", "200", "300", "400", "500", "600", "700", "800", "900"];

  for (var i = 0; i < shades.length; i++) {
    var shade = shades[i];
    var color = colors[shade];

    if (!color) {
      console.warn("No color found for shade:", shade);
      continue;
    }

    var variableName = "color/brand/" + shade;

    // Check if variable already exists
    var existingVariable = null;
    var existingVariables = figma.variables.getLocalVariables();

    for (var j = 0; j < existingVariables.length; j++) {
      var variable = existingVariables[j];
      if (
        variable.name === variableName &&
        variable.variableCollectionId === collectionId
      ) {
        existingVariable = variable;
        break;
      }
    }

    var rgbColor = {
      r: color.r,
      g: color.g,
      b: color.b,
    };

    if (existingVariable) {
      // Update existing variable
      try {
        existingVariable.setValueForMode(modeId, rgbColor);
        updated.push({
          name: variableName,
          shade: shade,
          color: rgbColor,
        });
        console.log("Updated variable:", variableName);
      } catch (error) {
        console.error("Error updating variable " + variableName + ":", error);
      }
    } else {
      // Create new variable
      try {
        var newVariable = figma.variables.createVariable(
          variableName,
          targetCollection,
          "COLOR"
        );
        newVariable.setValueForMode(modeId, rgbColor);
        created.push({
          name: variableName,
          shade: shade,
          color: rgbColor,
        });
        console.log("Created variable:", variableName);
      } catch (error) {
        console.error("Error creating variable " + variableName + ":", error);
      }
    }
  }

  console.log(
    "Brand color generation complete. Created:",
    created.length,
    "Updated:",
    updated.length
  );

  return {
    created: created,
    updated: updated,
  };
}
