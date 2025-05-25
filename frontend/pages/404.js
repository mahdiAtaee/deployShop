import React from 'react'
import Link from 'next/link'
import ShopLayout from '@/components/layouts/Shop'

const NotFound = () => {
    return (
        <ShopLayout title="صفحه یافت نشد">
            <section className="flex items-center justify-between flex-col md:flex-row text-center gap-4">
                <div className="w-32 h-32">
                    <img className="mb-lg-0 mb-5" src="/assets/img/error-icon.png" alt="" />
                </div>
                <div className="my-6">
                    <h1 className="font-size-60 text-primary">خطای 404</h1>
                    <p>با عرض پوزش صفحه پیدا نشد</p>
                    <Link href="/products" className="py-2 px-4 rounded-full bg-blue-300 text-white mt-6 block">
                        برگشت به صفحه اصلی
                    </Link>
                </div>
            </section>
        </ShopLayout>
    )
}

export default NotFound