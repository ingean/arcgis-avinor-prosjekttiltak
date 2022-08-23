import { createElement } from './utils/Element.js'
import * as Editor from './Editor.js'

export var projects = []


export const create = async (projectsLayer, projectAreasLayer, view) => {   
  let projects = await getProjects(projectsLayer)
  projects.features.forEach(feature => {
    addProject(projectAreasLayer, feature, view)
  })
}

const getProjects = (projectsLayer) => {
  return projectsLayer.queryFeatures({
    where: '1=1',
    returnGeometry: true,
    outFields: ["*"],
  })
}
  
const addProject = (layer, feature, view) => {
  let list = document.querySelector('#projects-list')

  let action = createAction('projects','layer-zoom-to')
  action.addEventListener('click', event => view.goTo(feature.geometry))

  let item = createListItem('projects', feature.attributes.Prosjektnummer, action)
  item.addEventListener('click', event => {
    
    Editor.setDefaultAttributeValue(layer, 'Prosjektnummer', feature.attributes.Prosjektnummer)
    
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

export const selectedProjectItem = async () => {
  let selectedItems = await document.getElementById('projects-list').getSelectedItems()
  selectedItems = [...selectedItems]
  return selectedItems[0][1]
}

export const selectedProject = async () => {
  let item = await selectedProjectItem()
  return item.attributes[1].nodeValue
}