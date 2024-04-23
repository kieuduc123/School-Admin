import React, { useEffect, useState } from 'react'
import { Button, Col, Row, Select, Form, Input, Table, Modal, Radio, DatePicker } from 'antd'
import Breadcrumb from '../../components/Breadcrumb'
import axios from 'axios'

const options = [
  { value: '1A1', label: '1A1' },
  { value: '1A2', label: '1A2' },
  { value: '1A3', label: '1A3' },
]

interface ClassesData {
  id: string
  gradeId: string
  schoolYearId: string
  teacherSchoolYearId: string
  roomId: string
  className: Date
  classCode: string
}

export default function Classes() {
  const [classes, setClasses] = useState<ClassesData[]>([])

  useEffect(() => {
    axios
      .get('http://14.248.97.203:4869/api/v1/school/school-year-class')
      .then((response) => {
        setClasses(response.data)
        console.log('Fetched students:', response.data)
      })
      .catch((error) => {
        // Handle error
        console.error('Error fetching data:', error)
      })
  }, [])

  // Hàm để mở modal
  const [isModalOpen, setIsModalOpen] = useState(false)

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const handleSubmit = (formData: any) => {
    // Make POST request to submit form data
    axios
      .post('http://14.248.97.203:4869/api/v1/school/creat-school-year-class', formData)
      .then((response) => {
        console.log('Data submitted:', response.data)
        setIsModalOpen(false)
      })
      .catch((error) => {
        console.error('Error submitting data:', error)
      })
  }
  return (
    <div>
      <Breadcrumb pageName="Classes" />
      <Row style={{ marginBottom: '20px' }}>
        {/* Năm học */}
        <Col span={6}>
          <Form.Item
            label="Năm học"
            labelAlign="left"
            colon={false}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            style={{ marginBottom: '8px' }}
          >
            <Select options={options} defaultValue={options[0].value} style={{ width: '80%' }} />
          </Form.Item>
        </Col>
        {/* Khối */}
        <Col span={6}>
          <Form.Item
            label="Khối"
            labelAlign="left"
            colon={false}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            style={{ marginBottom: '8px' }}
          >
            <Select options={options} defaultValue={options[0].value} style={{ width: '80%' }} />
          </Form.Item>
        </Col>
        {/* Tìm kiếm theo tên */}
        <Col span={6}>
          <Form.Item
            label="Tên"
            labelAlign="left"
            colon={false}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            style={{ marginBottom: '8px' }}
          >
            <Input type="text" placeholder="Điền tên học sinh" style={{ width: '80%' }} />
          </Form.Item>
        </Col>
        {/* Tìm kiếm theo mã */}
        <Col span={6}>
          <Form.Item
            label="Mã học sinh"
            labelAlign="left"
            colon={false}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            style={{ marginBottom: '8px' }}
          >
            <Input type="text" placeholder="Điền mã học sinh" style={{ width: '80%' }} />
          </Form.Item>
        </Col>
      </Row>
      <Row style={{ marginBottom: '15px' }}>
        <Col span={24} style={{ textAlign: 'right' }}>
          <Form.Item
            label=" "
            labelAlign="left"
            colon={false}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            style={{ marginBottom: '8px', paddingRight: '56px' }}
          >
            <div>
              <Button type="primary">Tìm kiếm</Button>
              <Button type="default" onClick={showModal} style={{ marginLeft: '20px' }}>
                Thêm
              </Button>
              <Modal
                title="Thêm học sinh"
                open={isModalOpen}
                onCancel={handleCancel}
                footer={[
                  <Button key="back" onClick={handleCancel}>
                    Cancel
                  </Button>,
                  <Button key="submit" type="primary" onClick={handleSubmit}>
                    Submit
                  </Button>,
                ]}
              >
                <div>
                  <Form
                    name="wrap"
                    labelCol={{ flex: '110px' }}
                    labelAlign="left"
                    labelWrap
                    wrapperCol={{ flex: 1 }}
                    colon={false}
                    style={{ maxWidth: 600 }}
                  >
                    <Form.Item label="Họ:" name="lastname" rules={[{ required: true, message: 'Please input!' }]}>
                      <Input />
                    </Form.Item>

                    <Form.Item label="Tên:" name="firstname" rules={[{ required: true, message: 'Please input!' }]}>
                      <Input />
                    </Form.Item>

                    <Form.Item label="Ngày sinh:" name="Dob" rules={[{ required: true, message: 'Please input!' }]}>
                      <DatePicker />
                    </Form.Item>

                    <Form.Item label="Giới tính:" name="gender" rules={[{ required: true, message: 'Please select!' }]}>
                      <Radio.Group>
                        <Radio value="male">Nam</Radio>
                        <Radio value="female">Nữ</Radio>
                      </Radio.Group>
                    </Form.Item>

                    <Form.Item label="Địa chỉ:" name="address" rules={[{ required: true, message: 'Please input!' }]}>
                      <Form.Item label="Lớp:" name="class" rules={[{ required: true, message: 'Please input!' }]}>
                        <Select />
                      </Form.Item>

                      <Input.TextArea autoSize={{ minRows: 1, maxRows: 6 }} />
                    </Form.Item>
                  </Form>
                </div>
              </Modal>
            </div>
          </Form.Item>
        </Col>
      </Row>
      <Table dataSource={classes} rowKey="id">
        <Table.Column title="Lớp" dataIndex="className" />
        <Table.Column title="Mã lớp" dataIndex="classCode" />
        <Table.Column title="Phòng" dataIndex="roomId" />
        <Table.Column title="Khối" dataIndex="gradeId" />
        <Table.Column title="Năm học" dataIndex="schoolYearId" />
        <Table.Column title="Giáo viên" dataIndex="teacherSchoolYearId" />
      </Table>
    </div>
  )
}
