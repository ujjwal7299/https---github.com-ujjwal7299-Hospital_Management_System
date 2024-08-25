import React from 'react'
import Sidebar from '../components/Sidebar'

const AdminLayout = (WrappedComponents) => {
    return (props) => {
        return (
            <>
                <div className="flex">
                    <div className="w-[6%]">
                        <Sidebar />
                    </div>
                    <div className="w-[94%] ml-10 rounded-s-3xl rounded-bl-3xl">

                    <WrappedComponents {...props} />
                    </div>
                </div>
            </>

        )
    }
}

export default AdminLayout