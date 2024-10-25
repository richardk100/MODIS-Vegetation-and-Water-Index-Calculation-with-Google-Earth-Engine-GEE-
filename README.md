# MODIS-Vegetation-and-Water-Index-Calculation-with-Google-Earth-Engine-GEE-
# MODIS Vegetation and Water Index Calculation with Google Earth Engine (GEE)

This project calculates various vegetation and water indices using MODIS imagery in Google Earth Engine (GEE). The indices include NDVI, SAVI, NDWI, NDSI, MNDWI, and MSAVI, which are useful for analyzing vegetation health, soil moisture, water bodies, and snow cover within a region of interest (ROI) for a specific time period.

## Project Overview

The project workflow:
1. **Region of Interest (ROI)**: A point of interest is defined, and imagery is filtered based on location and a specified date range.
2. **Index Calculation**: Different vegetation and water indices (NDVI, SAVI, NDWI, NDSI, MNDWI, MSAVI) are calculated using MODIS surface reflectance data.
3. **Visualization**: Each index is visualized using a color palette on the map.
4. **Export**: The computed indices are exported to Google Drive as image files for further analysis or reporting.

## Features
- **NDVI (Normalized Difference Vegetation Index)**: Assesses vegetation health by comparing near-infrared (NIR) and red bands.
- **SAVI (Soil Adjusted Vegetation Index)**: Similar to NDVI but includes a soil brightness correction factor.
- **NDWI (Normalized Difference Water Index)**: Detects water bodies using the NIR and SWIR bands.
- **NDSI (Normalized Difference Snow Index)**: Identifies snow cover based on the green and short-wave infrared bands.
- **MNDWI (Modified NDWI)**: Improves water body detection in built-up areas.
- **MSAVI (Modified SAVI)**: Further adjusts for soil influence in vegetation index calculation.

## Getting Started

### Prerequisites

To run this project, you need:
- A Google Earth Engine (GEE) account
- Basic knowledge of JavaScript
- Access to Google Drive to store exported results

### Installation

1. **Sign up for GEE**: If you don't have a GEE account, create one [here](https://earthengine.google.com/signup/).
2. **Set up a Google Cloud Project**: Ensure GEE and Google Drive permissions are enabled for exporting data.
3. **Clone the Repository**: Clone this project to your local machine.

    ```bash
    git clone https://github.com/richardk100/modis-vegetation-and-water-index-calculation-with-google-earth-engine-GEE-
    ```

4. **Open in GEE Code Editor**: Copy and paste the JavaScript code into the Google Earth Engine Code Editor.

### Usage

1. **Modify Region of Interest (ROI)**: Change the `roi` variable to your desired point of interest.

    ```javascript
    var roi = ee.Geometry.Point([longitude, latitude]).buffer(500);
    ```

2. **Set the Time Period**: Adjust the `startDate` and `endDate` to your preferred time range.

    ```javascript
    var startDate = 'YYYY-MM-DD';
    var endDate = 'YYYY-MM-DD';
    ```

3. **Run the Code**: After adjusting the settings, run the script in the GEE Code Editor to view and export the calculated indices.

4. **Export to Google Drive**: The indices are automatically exported to your Google Drive folder `GEE_Exports`. You can modify the folder name and image descriptions if needed.

## Example

```javascript
// Define a region of interest (ROI)
var roi = ee.Geometry.Point([-122.4481, 37.7599]).buffer(500);

// Define start and end dates for the time period of interest
var startDate = '2000-01-01';
var endDate = '2000-12-31';

// Filter imagery by date and location
var filtered = modis.filterBounds(roi).filterDate(startDate, endDate);

// Select the first image in the collection
var imageToDownload = ee.Image(filtered.first());

// Calculate NDVI
var ndvi = imageToDownload.normalizedDifference(['sur_refl_b02', 'sur_refl_b01']);
