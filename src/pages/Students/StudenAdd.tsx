import React, { useState } from 'react'
import { Button, Col, Modal, Form, Input, DatePicker, Radio, notification } from 'antd'
import { StudentFormValues } from 'src/types/response'
import mainAxios from 'src/apis/main-axios'

const StudentAdd: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [form] = Form.useForm()
  const showModal = () => setIsModalVisible(true)
  const handleCancel = () => setIsModalVisible(false)
  const handleOk = async () => {
    try {
      const values = await form.validateFields()
      await submitStudentData(values)
      notification.success({ message: 'Thêm học sinh thành công!' })
      setIsModalVisible(false)
    } catch (error) {
      console.log('Failed:')
    }
  }
  const submitStudentData = async (values: StudentFormValues) => {
    const formattedData = {
      ...values,
      birthday: values.birthday.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
    }
    try {
      await mainAxios.post('/api/v1/student', formattedData)
      form.resetFields()
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <Col span={8}>
        <Button type="primary" onClick={showModal}>
          Thêm
        </Button>
      </Col>
      <Modal
        title="Thêm Học Sinh"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Thêm"
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical" name="studentForm">
          <Form.Item name="gender" label="Giới tính" rules={[{ required: true }]}>
            <Radio.Group>
              <Radio value={true}>Nam</Radio>
              <Radio value={false}>Nữ</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item name="firstName" label="Tên" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="lastName" label="Họ" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="birthday" label="Ngày sinh" rules={[{ required: true }]}>
            <DatePicker />
          </Form.Item>
          <Form.Item name="address" label="Địa chỉ" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="status" label="Trạng thái" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="studentCode" label="Mã sinh viên" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default StudentAdd
