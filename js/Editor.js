
export const config = (editor, view, layer, projectnumber) => {
  
  const layerInfos = [
    {
      view,
      layer,
      formTemplate: {
        elements, 
        expressionInfos: [
        {
          name: 'projectnr',
          expression: 'Test',
        },
        {
        name: 'HideField',
        expression: 'false'
        }
      ]
      }
    }
  ]
  
  editor.layerInfos = layerInfos

  return editor
}


// Create an array of elements. If the element is autocasted, the type property must be set.
const elements = [{
  // autocastable as FieldElement
  type: "field",
  fieldName: "Prosjektnummer",
  label: "Prosjektnummer", 
  valueExpression: "projectnr"
  //visibilityExpression: 'HideField'
 },
 {
  type: "field",
  fieldName: "Kortnavn",
  label: "Kortnavn",
  hint: "Nytt tiltaksområde"
 },
 {
  type: "field",
  fieldName: "Navn",
  label: "Navn",
  hint: "Beskrivelse av tiltaket"
 },
 {
  type: "field",
  fieldName: "Tiltaksområdetype",
  label: "Tiltaksområdetype"
 }
]