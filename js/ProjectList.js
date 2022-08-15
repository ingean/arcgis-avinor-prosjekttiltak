import { createElement } from './utils/Element.js'
import * as Editor from './Editor.js'

export const addProjects = (id, layer, features, view, editor) => {   
  let list = document.querySelector(`#${id}-list`)

  features.forEach(feature => {
    addProject(id, layer, feature, list, view, editor)
  })
}
  
const addProject = (id, layer, feature, list, view, editor) => {
  let action = createAction(id,'layer-zoom-to')
  action.addEventListener('click', event => view.goTo(feature.geometry))

  let item = createListItem(id, feature.attributes.Prosjektnummer, action)
  item.addEventListener('click', event => {
    Editor.config(editor, view, layer, feature.attributes.Prosjektnummer)
    
    layer.queryFeatures({
      where: `Prosjektnummer='${feature.attributes.Prosjektnummer}'`,
      returnGeometry: true,
      outFields: ["*"],
    })
    .then(featureSet => {
      if (!featureSet) return
      addTaskAreasListItems(featureSet.features)
    })
  })
  list.appendChild(item)
}

const addTaskAreasListItems = (features) => {
  let list = document.getElementById('taskareas-list')
  list.innerHTML = ''

  features.forEach(feature => {
    let label = feature.attributes.Kortnavn
    let descr = feature.attributes.Navn
    let action = createAction('events', 'copy')
    action.addEventListener('click', event => view.goTo(feature.geometry))
  
    let item = createListItem('events', label, action, descr)
    let elements = [action, item]

    elements.forEach(element => {
      element.addEventListener('click', event => {})
    })    
    list.appendChild(item)
  })
}

const createAction = (id, icon) => {
  return createElement('calcite-action', {
    class: `${id}-list-item-action`,
    slot: 'actions-end',
    icon
  })
}

const createListItem = (id, label, action, descr) => {
  return createElement('calcite-value-list-item', {
    class: `${id}-list-item`,  
    label,
    ...(descr && { description: descr }), // Only add description if not null or undefined
    },
    action
  )
}