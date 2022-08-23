import FeatureLayer from "https://js.arcgis.com/4.24/@arcgis/core/layers/FeatureLayer.js"
import * as esriLang from "https://js.arcgis.com/4.24/@arcgis/core/core/lang.js"

export const config = (view) => {
  
  const layer = new FeatureLayer({
    title: 'Tiltaksområder',
    url: 'https://services.arcgis.com/2JyTvMWQSnM2Vi8q/arcgis/rest/services/Prosjekttiltak/FeatureServer/1',
    popupTemplate: template
  })
  

  // Event handler that fires each time an action is clicked.
  view.popup.on("trigger-action", (event) => {
    if (event.action.id === "copy-feature") {
      copyFeature(view, layer)
    }
  })

  return layer
}

// Add this action to the popup so it is always available in this view
const copyFeatureAction = {
  title: "Kopiere område",
  id: "copy-feature",
  image: "copy.png"
}

const template = {
  // autocasts as new PopupTemplate()
  title: "Tiltaksområde",
  content: [
    {
      type: "fields",
      fieldInfos: [
        {
          fieldName: "Kortnavn",
          label: "Kortnavn"
        },
        {
          fieldName: "Navn",
          label: "Navn"
        },
        {
          fieldName: "Prosjektnummer",
          label: "Prosjektnummer"
        }
      ]
    }
  ],
  actions: [copyFeatureAction],
  returnGeometry: true,
  outFields: ["*"]
}

// Execute each time the "Kopiere område" is clicked
const copyFeature = (view, featureLayer) => {
  view.watch("popup.viewModel.active", async ( ) => {
    const feature = view.popup.selectedFeature
    let featureCopy = esriLang.clone(feature)
    featureCopy.attributes.Prosjektnummer = await selectedProject()

    featureLayer.applyEdits({
      addFeatures: [featureCopy]
    })
  })
}

