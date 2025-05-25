import Link from 'next/link'
import React from 'react'


const AuthLink = () => {
    return (
        <div className="card border-0 mb-md-0 mb-3">
            <div className="card-body p-md-5 p-4">
                <h5 className="text-primary">ورود یا ثبت نام</h5>
                <p className="text-muted mb-4">برای ثبت نهایی سفارش باید وارد حساب کاربری خود شوید</p>
                <Link href="/auth/login" className="btn btn-pill btn-outline">ورود</Link>
            </div>
        </div>

    )
}

export default AuthLink