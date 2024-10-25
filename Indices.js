Map.addLayer(roi)
Map.centerObject(roi, 8)
// Load MODIS imagery
var modis = ee.ImageCollection("MODIS/006/MOD09A1");

// Define a region of interest (ROI)
var roi = ee.Geometry.Point([-122.4481, 37.7599]).buffer(500);

// Define start and end dates for the time period of interest
var startDate = '2000-01-01';
var endDate = '2000-12-31';

// Filter imagery by date and location
var filtered = modis.filterBounds(roi)
                    .filterDate('2000-01-01', '2000-12-31');

// Select the first image in the collection
var imageToDownload = ee.Image(filtered.first());

// Calculate NDVI
var ndvi = imageToDownload.normalizedDifference(['sur_refl_b02', 'sur_refl_b01']);

// Calculate SAVI
var savi = imageToDownload.expression(
    '(1 + L) * (NIR - RED) / (NIR + RED + L)',
    {
      'NIR': imageToDownload.select('sur_refl_b02'),
      'RED': imageToDownload.select('sur_refl_b01'),
      'L': 0.5
    }
);

// Calculate NDWI
var ndwi = imageToDownload.normalizedDifference(['sur_refl_b02', 'sur_refl_b06']);

// Calculate NDSI
var ndsi = imageToDownload.normalizedDifference(['sur_refl_b02', 'sur_refl_b05']);

// Calculate MNDWI
var mndwi = imageToDownload.normalizedDifference(['sur_refl_b03', 'sur_refl_b06']);

// Calculate MSAVI
var msavi = imageToDownload.expression(
    '(2 * NIR + 1 - sqrt(pow((2 * NIR + 1), 2) - 8 * (NIR - RED))) / 2',
    {
      'NIR': imageToDownload.select('sur_refl_b02'),
      'RED': imageToDownload.select('sur_refl_b01')
    }
);
// Add layers to the map
Map.addLayer(ndvi, {min: -1, max: 1, palette: ['blue', 'white', 'green']}, 'NDVI');
Map.addLayer(savi, {min: -1, max: 1, palette: ['blue', 'white', 'green']}, 'SAVI');
Map.addLayer(ndwi, {min: -1, max: 1, palette: ['blue', 'white', 'green']}, 'NDWI');
Map.addLayer(ndsi, {min: -1, max: 1, palette: ['blue', 'white', 'green']}, 'NDSI');
Map.addLayer(mndwi, {min: -1, max: 1, palette: ['blue', 'white', 'green']}, 'MNDWI');
Map.addLayer(msavi, {min: -1, max: 1, palette: ['blue', 'white', 'green']}, 'MSAVI');
// Export all images to Google Drive
Export.image.toDrive({
  image: ndvi,
  description: 'NDVI_Image',
  folder: 'GEE_Exports',
  region: roi,
  scale: 500
});

Export.image.toDrive({
  image: savi,
  description: 'SAVI_Image',
  folder: 'GEE_Exports',
  region: roi,
  scale: 500
});

Export.image.toDrive({
  image: ndwi,
  description: 'NDWI_Image',
  folder: 'GEE_Exports',
  region: roi,
  scale: 500
});

Export.image.toDrive({
  image: ndsi,
  description: 'NDSI_Image',
  folder: 'GEE_Exports',
  region: roi,
  scale: 500
});

Export.image.toDrive({
  image: mndwi,
  description: 'MNDWI_Image',
  folder: 'GEE_Exports',
  region: roi,
  scale: 500
});

Export.image.toDrive({
  image: msavi,
  description: 'MSAVI_Image',
  folder: 'GEE_Exports',
  region: roi,
  scale: 500
});
