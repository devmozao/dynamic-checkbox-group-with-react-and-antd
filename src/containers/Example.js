// imports
import React, { useState, useEffect } from 'react'
import { Col, Row } from 'antd'
import 'antd/dist/antd.css'
// custom component loaded
import CustomCheckboxGroup from '../components/customCheckboxGroup/CustomCheckboxGroup'

// mock with all picklist values that will be displayed.
const frontendSkills = [
  { id: 1, type_name: 'Angular' },
  { id: 2, type_name: 'React' },
  { id: 3, type_name: 'Vue' },
  { id: 4, type_name: 'Ember' },
  { id: 5, type_name: 'Styled Components' }
]
// mock with only the values that will start as checked.
const checkedFrontendSkills = [
  { id: 2, type_name: 'React' },
  { id: 3, type_name: 'Vue' }
]
// another mock with all values that will be displayed.
const backendSkills = [
  { id: 1, type_name: 'Nodejs' },
  { id: 2, type_name: 'GoLang' },
  { id: 3, type_name: 'Rust' },
  { id: 4, type_name: 'Clojure' },
  { id: 5, type_name: 'Lisp' }
]
// another mock with only the values that will start as checked
const checkedBackendSkills = [
  { id: 1, type_name: 'Nodejs' },
  { id: 2, type_name: 'GoLang' }
]

// main component
const Example = () => {
  // states for each picklist group (backend/frontend)
  const [frontendValues, setFrontendValues] = useState([])
  const [backendValues, setBackendValues] = useState([])
  // state to hold form values
  const [formValues, setFormValues] = useState([])

  // effects only used to log the values that are mutating on state vars
  useEffect(() => {
    console.log('frontendValues', frontendValues)
  }, [frontendValues])
  useEffect(() => {
    console.log('backendValues', backendValues)
  }, [backendValues])

  // default Effect when component Mount
  useEffect(() => {
    // suppose that this parts makes an api call with axios
    // then, it process the result and set into formValues to be passed to component
    setFormValues({
      frontendSkills: frontendSkills,
      checkedFrontendSkills: checkedFrontendSkills,
      backendSkills: backendSkills,
      checkedBackendSkills: checkedBackendSkills
    })
  }, [])

  // main component
  return (
    <>
      <Row gutter={16}>
        <Col span={12}>
          {'Frontend Skills'}
          <CustomCheckboxGroup
            values={formValues.frontendSkills}
            defaultCheckedList={formValues.checkedFrontendSkills}
            groupState={setFrontendValues}
          />
        </Col>
        <Col span={12}>
          {'Backend Skills'}
          <CustomCheckboxGroup
            values={formValues.backendSkills}
            defaultCheckedList={formValues.checkedBackendSkills}
            groupState={setBackendValues}
          />
        </Col>
      </Row>
    </>
  )
}

export default Example
