---
title: Layers
id: layers
description: A style's layers property lists all of the layers available in that style.
contentType: specification
order: 8
layout: page
hideFeedback: true
products:
- Mapbox Style Specification
prependJs:
    - "import Items from '../../components/style-spec/items';"
    - "import { layerTypes } from '../../data/types';"
    - "import combineItems from '../../util/combine-items';"
    - "import ref from '../../../maplibre-gl-js/rollup/build/tsc/src/style-spec/reference/latest';"
    - "import AppropriateImage from '../../components/appropriate-image';"
    - "import Caption from '../../components/caption';"
---

A style's `layers` property lists all the layers available in that style. The type of layer is specified by the `"type"` property, and must be one of {{layerTypes.map((t, i) => <var key={i}>{t}</var>).reduce((prev, curr) => [prev, ', ', curr])}}.

Except for layers of the <var>background</var> type, each layer needs to refer to a source. Layers take the data that they get from a source, optionally filter features, and then define how those features are styled.

```json
"layers": {{JSON.stringify(
    ref.$root.layers.example,
    null,
    2
    )}}
```

<!--
START GENERATED CONTENT:
Content in this section is generated directly using the MapLibre Style
Specification. To update any content displayed in this section, make edits to:
https://github.com/maplibre/maplibre-gl-js/blob/main/src/style-spec/reference/v8.json.
-->
{{ <Items entry={ref.layer} />}}
<!-- END GENERATED CONTENT -->

{{<a id="layout-property" className="anchor" />}}
{{<a id="paint-property" className="anchor" />}}

<hr className='my36' />

Layers have two sub-properties that determine how data from that layer is rendered: `layout` and `paint` properties.

_Layout properties_ appear in the layer's `"layout"` object. They are applied early in the rendering process and define how data for that layer is passed to the GPU. Changes to a layout property require an asynchronous "layout" step.

_Paint properties_ are applied later in the rendering process. Paint properties appear in the layer's `"paint"` object. Changes to a paint property are cheap and happen synchronously.

<!--
START GENERATED CONTENT:
Content in this section is generated directly using the MapLibre Style
Specification. To update any content displayed in this section, make edits to:
https://github.com/maplibre/maplibre-gl-js/blob/main/src/style-spec/reference/v8.json.
-->

## background

The `background` style layer covers the entire map. Use a background style layer to configure a color or pattern to show below all other map content. If the background layer is transparent or omitted from the style, any part of the map view that does not show another style layer is transparent.

{{
  <AppropriateImage
    imageId="layer-background"
    alt="Vintage map style with a brown halftone background pattern."
  />
}}

{{<Caption>}}
The [Vintage map style](https://blog.mapbox.com/designing-the-vintage-style-in-mapbox-studio-9da4aa2a627f) uses a custom SVG [`background-pattern`](/maplibre-gl-js-docs/style-spec/layers/#paint-background-background-pattern) to achieve a textured vintage look.
{{</Caption>}}

{{<Items headingLevel="3" entry={combineItems(['layout','paint'], 'background')} /> }}

## fill

A `fill` style layer renders one or more filled (and optionally stroked) polygons on a map. You can use a fill layer to configure the visual appearance of polygon or multipolygon features.

{{
  <AppropriateImage
    imageId="layer-fill"
    alt="Map of Washington, D.C. with a purple isochrone polygon in the center."
  />
}}

{{<Caption>}}
This map of Washington, D.C. uses the [`fill-opacity`](/maplibre-gl-js-docs/style-spec/layers/#paint-fill-fill-opacity) paint property to render a semi-transparent polygon, showing how far a person can walk from the center of the city in ten minutes.
{{</Caption>}}

{{<Items headingLevel="3" entry={combineItems(['layout','paint'], 'fill')} /> }}

## line

A `line` style layer renders one or more stroked polylines on the map. You can use a line layer to configure the visual appearance of polyline or multipolyline features.

{{
  <AppropriateImage
    imageId="layer-line"
    alt="Outdoors style map with a red line showing a hiking path."
  />
}}

{{<Caption>}}
This map of a [Strava](https://blog.mapbox.com/strava-launches-gorgeous-new-outdoor-maps-977c74cf37f9) user's hike through Grand Teton National Park uses the [`line-color`](/maplibre-gl-js-docs/style-spec/layers/#paint-line-line-color) and [`line-width`](/maplibre-gl-js-docs/style-spec/layers/#paint-line-line-width) paint properties to style the strong red line of the user's route.
{{</Caption>}}

{{<Items headingLevel="3" entry={combineItems(['layout','paint'], 'line')} /> }}

## symbol

A `symbol` style layer renders icon and text labels at points or along lines on a map. You can use a symbol layer to configure the visual appearance of labels for features in vector tiles.

{{
  <AppropriateImage
    imageId="layer-symbol"
    alt="Map with thirty shopping bag icons, color-coded red, orange, and green."
  />
}}

{{<Caption>}}
This map of Denver area businesses uses the [`icon-image`](/maplibre-gl-js-docs/style-spec/layers/#layout-symbol-icon-image) layout property to use a custom image as an icon in a symbol layer.
{{</Caption>}}

{{<Items headingLevel="3" entry={combineItems(['layout','paint'], 'symbol')} /> }}

## raster

A `raster` style layer renders raster tiles on a map. You can use a raster layer to configure the color parameters of raster tiles.

{{
  <AppropriateImage
    imageId="layer-raster"
    alt="Shortwave infrared imagery of California wildfires overlayed near the city of Morgan Hill."
  />
}}

{{<Caption>}}
This [interactive SWIR imagery map by Maxar](https://blog.maxar.com/news-events/2020/maxar-and-mapbox-release-interactive-swir-imagery-map-of-california-wildfires?utm_source=mapbox&utm_medium=blog&utm_campaign=ca-wildfires-2020-map) uses the [`visibility`](/maplibre-gl-js-docs/style-spec/layers/#layout-raster-visibility) layout property to show or hide raster layers with shortwave infrared satellite imagery of California wildfires.
{{</Caption>}}

{{<Items headingLevel="3" entry={combineItems(['layout','paint'], 'raster')} /> }}

## circle

A `circle` style layer renders one or more filled circles on a map. You can use a circle layer to configure the visual appearance of point or point collection features in vector tiles. A circle layer renders circles whose radii are measured in screen units.

{{
  <AppropriateImage
    imageId="layer-circle"
    alt="Map with circles of different sizes and colors."
  />
}}

{{<Caption>}}
This [cluster map](/maplibre-gl-js-docs/example/cluster/) uses a circle layer with a GeoJSON data source and sets the source's [`cluster`](/maplibre-gl-js-docs/style-spec/sources/#geojson-cluster) property to `true` to visualize points as clusters.
{{</Caption>}}

{{<Items headingLevel="3" entry={combineItems(['layout','paint'], 'circle')} /> }}

## fill-extrusion

A `fill-extrusion` style layer renders one or more filled (and optionally stroked) extruded (3D) polygons on a map. You can use a fill-extrusion layer to configure the extrusion and visual appearance of polygon or multipolygon features.

{{
  <AppropriateImage
    imageId="layer-fill-extrusion"
    alt="Map of Europe and North Africa with countries extruded to various heights."
  />
}}

{{<Caption>}}
This map uses an external dataset to provide data-driven values for the [`fill-extrusion-height`](/maplibre-gl-js-docs/style-spec/layers/#paint-fill-extrusion-fill-extrusion-height) paint property of various [country polygons](https://blog.mapbox.com/high-resolution-administrative-country-polygons-in-studio-57cf4abb0768) in a fill-extrusion layer.
{{</Caption>}}

{{<Items headingLevel="3" entry={combineItems(['layout','paint'], 'fill-extrusion')} /> }}

## heatmap

A `heatmap` style layer renders a range of colors to represent the density of points in an area.

{{
  <AppropriateImage
    imageId="layer-heatmap"
    alt="Dark map with a heatmap layer glowing red inside and white outside."
  />
}}

{{<Caption>}}
[This visualization of earthquake data](/maplibre-gl-js-docs/example/heatmap-layer/) uses a heatmap layer with carefully defined [paint](/maplibre-gl-js-docs/style-spec/layers/#paint-property) properties to highlight areas where earthquake frequency is high and many points are clustered closely together.
{{</Caption>}}

{{<Items headingLevel="3" entry={combineItems(['layout','paint'], 'heatmap')} /> }}

## hillshade

A `hillshade` style layer renders digital elevation model (DEM) data on the client-side. The implementation only supports Mapbox Terrain RGB and Mapzen Terrarium tiles.

{{
  <AppropriateImage
    imageId="layer-hillshade"
    alt="Map of Mount Shasta rising up with striking texture and shading."
  />
}}

{{<Caption>}}
This map of Mount Shasta uses a high value for the [`hillshade-exaggeration`](/maplibre-gl-js-docs/style-spec/layers/#paint-hillshade-hillshade-exaggeration) paint property to apply an intense shading effect.
{{</Caption>}}

{{<Items headingLevel="3" entry={combineItems(['layout','paint'], 'hillshade')} /> }}

<!-- END GENERATED CONTENT -->
