import FeatureLayer from "https://js.arcgis.com/4.24/@arcgis/core/layers/FeatureLayer.js"

export const config = () => {
  const layer = new FeatureLayer({
    title: 'Prosjekter',
    url: 'https://services.arcgis.com/2JyTvMWQSnM2Vi8q/arcgis/rest/services/Prosjekttiltak/FeatureServer/0',
  })
  return layer
}