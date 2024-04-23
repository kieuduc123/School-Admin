import CardFour from 'src/components/CardFour'
import ChartOne from 'src/components/ChartOne'
import ChatCard from 'src/components/ChatCard'
import TableOne from 'src/components/TableOne'
import React from 'react'
// import teacherApi from '@/apis/urlApi.ts'
// import CardFour from '@/components/CardFour.tsx'
// import CardOne from '../../components/CardOne.tsx'
// import CardThree from '../../components/CardThree.tsx'
// import CardTwo from '../../components/CardTwo.tsx'
// import ChartThree from '../../components/ChartThree.tsx'
// import ChatCard from '@/components/ChatCard.tsx'
// import TableOne from '@/components/TableOne.tsx'

const ECommerce = () => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardFour />
        <ChartOne />
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <div className="col-span-12 xl:col-span-8">
          <TableOne />
        </div>
        <ChatCard />
      </div>
    </>
  )
}

export default ECommerce
