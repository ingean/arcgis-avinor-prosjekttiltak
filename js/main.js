import esriConfig from 'https://js.arcgis.com/4.24/@arcgis/core/config.js'
import Map from 'https://js.arcgis.com/4.24/@arcgis/core/Map.js'
import MapView from 'https://js.arcgis.com/4.24/@arcgis/core/views/MapView.js'
import ActionBar from './ActionBar.js'
import MapTheme from './MapTheme.js'
import * as OAuth2 from './OAuth2.js'
import * as ProjectsList from './ProjectList.js'
import * as ProjectAreasLayer from './ProjectAreasLayer.js'
import * as ProjectsLayer from './ProjectsLayer.js' 

//esriConfig.apiKey = 'AAPKf28ba4fdd1e945a1be5f8d43dbd650eaMjyiDjdFXaCPZzo5erYJ7Xc7XKvBlbJZIPvNu0O2zwfeFiGhqoBvtQwJUZ1DMXIL'
const portal = await OAuth2.authenticate() //Authenticate with named user using OAuth2

//const webmapId = 'ca83bcfde5cb450b97a897b8f753c2c3' // Publicly available webmap

const theme = new MapTheme() // Contains light and dark basemap

const map = new Map({
  basemap: theme.darkBaseMap
})

const view = new MapView({
  map,
  container: "viewDiv",
  padding: {
    left: 49
  }
});

theme.view = view

const actionBar = new ActionBar(view, 'projects')

const projectsLayer = ProjectsLayer.config()
const projectAreasLayer = ProjectAreasLayer.config(view)
map.addMany([projectsLayer, projectAreasLayer])

projectsLayer.queryFeatures({
  where: '1=1',
  returnGeometry: true,
  outFields: ["*"],
})
.then(featureSet => {
  ProjectsList.addProjects('projects', projectAreasLayer, featureSet.features, view, actionBar.widgets.editor)
})

document.getElementById('add-area-btn')
.addEventListener('click', event => {
  let widget = actionBar.widgets.editor
  widget.visible = !widget.visible
})

const title = 'Prosjekt: GIS-123'
document.querySelector("#header-title").textContent = title
document.querySelector("calcite-shell").hidden = false
document.querySelector("calcite-loader").active = false