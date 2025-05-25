import React from 'react'

const index = () => {
    return (
        <form>
            <div className="form-group">
                <label>نام</label>
                <input type="text" className="form-control" placeholder="نام خود را وارد نمایید" />
            </div>
            <div className="form-group">
                <label>نام خانوادگی</label>
                <input type="text" className="form-control" placeholder="نام خانوادگی خود را وارد نمایید" />
            </div>
            <div className="form-group">
                <label>ایمیل</label>
                <input type="email" className="form-control" placeholder="ایمیل خود را وارد نمایید" />
            </div>
            <div className="form-group">
                <label>موبایل</label>
                <input type="text" className="form-control" placeholder="موبایل خود را وارد نمایید" />
            </div>
            <button type="submit" className="btn btn-pill btn-primary">
                ذخیره
            </button>
        </form>

    )
}

export default index