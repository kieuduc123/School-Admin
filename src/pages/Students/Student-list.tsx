import React, { useEffect, useState } from 'react'
import { Col, Row, Select, Form, Table, Breadcrumb } from 'antd'
import mainAxios from '../../apis/main-axios'
import Loader from '../../common/Loader'
import StudentAdd from './StudenAdd'
// import { StudentData } from '@/types/response'

interface Student {
  studentCode: string
  firstName: string
  lastName: string
  birthday: string
  gender: boolean // Assuming gender is a boolean, adjust based on actual data structure
  address: string
  status: boolean // Assuming status is a boolean
}

export default function Students() {
  const [loading, setLoading] = useState(false)
  const [students, setStudents] = useState<any>([])
  const [filteredStudents, setFilteredStudents] = useState<any>([])
  const [classCodes, setClassCodes] = useState<any>([])
  const [selectedClass, setSelectedClass] = useState<any>('')

  useEffect(() => {
    ;(async () => {
      try {
        setLoading(!loading)
        const response = await mainAxios.get<Student[]>('/api/v1/student')
        const studentsData: Student[] = response.data
        const studentsGroupedByCode = studentsData.reduce(
          (grouped: { [x: string]: any[] }, student: { studentCode: string | number }) => {
            grouped[student.studentCode] = grouped[student.studentCode] || []
            grouped[student.studentCode].push(student)
            return grouped
          },
          {}
        )
        const groupedStudentsArray = Object.values(studentsGroupedByCode).flat()
        setStudents(groupedStudentsArray)
        setFilteredStudents(groupedStudentsArray)
        const classCodeSet: Set<any> = new Set(groupedStudentsArray.map((student) => student.studentCode))
        setClassCodes([...classCodeSet].sort())
        setLoading(false)
      } catch (error) {
        console.error('Error fetching students:', error)
      }
    })()
  }, [])

  const handleClassChange = (value: any) => {
    setSelectedClass(value)
    const filtered = value
      ? students.filter((student: { studentCode: any }) => student.studentCode === value)
      : students
    filtered.sort((a: { studentCode: string }, b: { studentCode: any }) =>
      a.studentCode.localeCompare(b.studentCode, undefined, {
        numeric: true,
        sensitivity: 'base',
      })
    )

    setFilteredStudents(filtered)
  }

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Breadcrumb />
          <Row gutter={24} className="dark:bg-boxdark-2 dark:text-bodydark">
            <Col span={8}>
              <Form.Item label="Lớp">
                <Select value={selectedClass} onChange={handleClassChange} placeholder="Select a class" allowClear>
                  {classCodes.map((code: any) => (
                    <Select.Option key={code} value={code}>
                      {code}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <StudentAdd />
            </Col>
          </Row>
          <Table
            className="dark:bg-boxdark-2 dark:text-bodydark"
            dataSource={filteredStudents}
            rowKey="id"
            pagination={{ pageSize: 20 }}
            columns={[
              {
                title: 'Mã Lớp',
                dataIndex: 'studentCode',
              },
              {
                title: 'Họ và tên',
                dataIndex: 'name',
                render: (_, record) => `${record.firstName} ${record.lastName}`,
                sorter: (a, b) => `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`),
              },
              {
                title: 'Ngày sinh',
                dataIndex: 'birthday',
                render: (birthday) => {
                  return birthday ? new Date(birthday).toLocaleDateString('en-CA').split('-').reverse().join('-') : ''
                },
                sorter: (a, b) => new Date(a.birthday).getTime() - new Date(b.birthday).getTime(),
              },
              {
                title: 'Giới tính',
                dataIndex: 'gender',
                render: (gender) => (gender ? 'Male' : 'Female'),
                sorter: (a, b) => (a.gender === b.gender ? 0 : a.gender ? -1 : 1),
              },
              {
                title: 'Địa chỉ',
                dataIndex: 'address',
              },
              {
                title: 'Trạng thái',
                dataIndex: 'status',
                render: (status) => (status ? 'Active' : 'Inactive'),
              },
            ]}
          />
        </>
      )}
    </div>
  )
}
