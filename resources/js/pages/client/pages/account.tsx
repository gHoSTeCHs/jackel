import MainLayout from '@/pages/client/layouts/main-layout';

const Account = () => {
    return (
        <MainLayout>
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Person Profile</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item">
                                    <a href="#">Dashboard</a>
                                </li>

                                <li className="breadcrumb-item">
                                    <a href="#">Manage</a>
                                </li>
                                <li className="breadcrumb-item active">UserName</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </section>
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-3">
                            <div className="card card-purple card-outline">
                                <div className="card-body box-profile">
                                    <div className="text-center">Client Picture</div>

                                    <h3 className="profile-username text-center">Name</h3>

                                    <p className="text-muted text-center">Client @iBanking </p>

                                    <ul className="list-group list-group-unbordered mb-3">
                                        <li className="list-group-item">
                                            <b>ID No.: </b> <a className="float-right">National Id</a>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Email: </b> <a className="float-right">Client email</a>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Phone: </b> <a className="float-right">Phone</a>
                                        </li>
                                        <li className="list-group-item">
                                            <b>ClientNo: </b> <a className="float-right">Client Number</a>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Address: </b> <a className="float-right">Address</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-9">
                            <div className="card">
                                <div className="card-header p-2">
                                    <ul className="nav nav-pills">
                                        <li className="nav-item">
                                            <a className="nav-link active" href="#" data-toggle="tab">
                                                Update Profile
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#" data-toggle="tab">
                                                Change Password
                                            </a>
                                        </li>
                                    </ul>
                                </div>

                                <div className="card-body">
                                    <div className="tab-content">
                                        <div className="tab-pane active" id="update_Profile">
                                            <form method="post" encType="multipart/form-data" className="form-horizontal">
                                                <div className="form-group row">
                                                    <label htmlFor="inputName" className="col-sm-2 col-form-label">
                                                        Name
                                                    </label>
                                                    <div className="col-sm-10">
                                                        <input
                                                            type="text"
                                                            name="name"
                                                            required
                                                            className="form-control"
                                                            placeholder="Enter your name"
                                                            id="nameInput"
                                                            disabled
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label htmlFor="inputEmail" className="col-sm-2 col-form-label">
                                                        Email
                                                    </label>
                                                    <div className="col-sm-10">
                                                        <input
                                                            type="email"
                                                            name="email"
                                                            required
                                                            placeholder="Enter your email"
                                                            className="form-control"
                                                            id="inputEmail"
                                                            disabled
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label htmlFor="inputName2" className="col-sm-2 col-form-label">
                                                        Contact
                                                    </label>
                                                    <div className="col-sm-10">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            required
                                                            name="phone"
                                                            placeholder="Enter your contact number"
                                                            id="phoneInput"
                                                            disabled
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label htmlFor="inputName2" className="col-sm-2 col-form-label">
                                                        National ID Number
                                                    </label>
                                                    <div className="col-sm-10">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            required
                                                            readOnly
                                                            name="national_id"
                                                            placeholder="National ID (read-only)"
                                                            id="nationalIdInput"
                                                            disabled
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label htmlFor="inputName2" className="col-sm-2 col-form-label">
                                                        Address
                                                    </label>
                                                    <div className="col-sm-10">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            required
                                                            name="address"
                                                            placeholder="Enter your address"
                                                            id="addressInput"
                                                            disabled
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label htmlFor="inputName2" className="col-sm-2 col-form-label">
                                                        Profile Picture
                                                    </label>
                                                    <div className="input-group col-sm-10">
                                                        <div className="custom-file">
                                                            <input
                                                                type="file"
                                                                name="profile_pic"
                                                                className="form-control custom-file-input"
                                                                id="exampleInputFile"
                                                                disabled
                                                            />
                                                            <label className="custom-file-label col-form-label" htmlFor="exampleInputFile">
                                                                Choose file
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <div className="offset-sm-2 col-sm-10">
                                                        <button
                                                            name="update_client_account"
                                                            type="submit"
                                                            className="btn btn-outline-success"
                                                            disabled
                                                        >
                                                            Update Account
                                                        </button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>

                                        <div className="tab-pane" id="Change_Password">
                                            <form method="post" className="form-horizontal">
                                                <div className="form-group row">
                                                    <label htmlFor="inputName" className="col-sm-2 col-form-label">
                                                        Old Password
                                                    </label>
                                                    <div className="col-sm-10">
                                                        <input
                                                            type="password"
                                                            className="form-control"
                                                            required
                                                            id="oldPasswordInput"
                                                            placeholder="Enter old password"
                                                            disabled
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label htmlFor="inputEmail" className="col-sm-2 col-form-label">
                                                        New Password
                                                    </label>
                                                    <div className="col-sm-10">
                                                        <input
                                                            type="password"
                                                            name="password"
                                                            className="form-control"
                                                            required
                                                            id="inputPassword"
                                                            placeholder="Enter new password"
                                                            disabled
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label htmlFor="inputName2" className="col-sm-2 col-form-label">
                                                        Confirm New Password
                                                    </label>
                                                    <div className="col-sm-10">
                                                        <input
                                                            type="password"
                                                            className="form-control"
                                                            required
                                                            id="confirmPasswordInput"
                                                            placeholder="Confirm new password"
                                                            disabled
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <div className="offset-sm-2 col-sm-10">
                                                        <button
                                                            type="submit"
                                                            name="change_client_password"
                                                            className="btn btn-outline-success"
                                                            disabled
                                                        >
                                                            Change Password
                                                        </button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
};

export default Account;
