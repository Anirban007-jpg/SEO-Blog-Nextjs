import { useState } from "react"
import { getCookie } from "../../actions/auth";
import { create } from "../../actions/category";


const Category = () => {
    const [values,setValues] = useState({
        name:'',
        error:'',
        success:'',
        catagories: [],
        removed: ''
    })

    const {name,error,success,catagories,removed} = values;
    const token = getCookie('token');

    const handleChange = e => {
        setValues({...values, name: e.target.value, error: '', success: '', removed:''});
        // console.log(token);
    } 

    const clickSubmit = e => {
        e.preventDefault();
        // console.log('create category', name);        
        create({name}, token).then(data => {
            if (data.error){
                setValues({...values, error: data.error, success:''})
            }else{
                setValues({...values, error: '', success: data.message, name: ''})
            }
        })
    } 
    const newCategroyForm = () => (
        <form onSubmit={clickSubmit}>
            <div className="form-group" noValidate>
                <label className="text-muted">Name</label>
                <br />
                <input type="text" className="form-control" onChange={handleChange} value={name} />
            </div><hr />
            <div>
                <button type="submit" className="btn btn-primary">
                    Create Category
                </button>
            </div>
        </form>
    );

    return <React.Fragment>{newCategroyForm()}</React.Fragment>
}

export default Category
