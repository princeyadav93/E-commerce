import React from 'react'
import './addproduct.css'
import axios from 'axios'
import { useState } from 'react'
function Addproducts() {
    const [title, settitle] = useState("")
    const [category, setcategory] = useState("")
    const [oldprice, setoldprice] = useState(Number)
    const [newprice, setnewprice] = useState(Number)
    const [description, setdescription] = useState("")
    const [itemImage, setitemImage] = useState("")
    const [error, seterror] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (localStorage.getItem("adminInfo")) {
            const formData = new FormData()
            formData.append("title", title);
            formData.append("category", category);
            formData.append("oldPrice", oldprice);
            formData.append("newPrice", newprice);
            formData.append("description", description);
            formData.append("itemImage", itemImage);

            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            };
            try {
                const response = await axios.post("/api/v1/admin/product/addproduct", formData, config)
                // if (response.data) {
                //     alert("Product added")
                // }
                console.log(response)
            } catch (err) {
                seterror("something went wrong while uploading data")
                console.log(err)

            }
        } else {
            alert("Login required!")
        }
    }

    return (
        <>
            <div className='addproduct-box'>
                {error && <p>{error}</p>}
                <form onSubmit={handleSubmit} >
                    <div className="addproduct-box2">
                        <div className="name">
                            <label htmlFor="title">Product Name:
                                <input type="text"
                                    id='title'
                                    required
                                    value={title}
                                    onChange={(e) => settitle(e.target.value)}
                                />
                            </label>
                            <label htmlFor="category">Category:
                                <select name="category"
                                    id="category"
                                    value={category}
                                    onChange={(e) => setcategory(e.target.value)}>
                                    <option value="men">Men</option>
                                    <option value="women">Women</option>
                                    <option value="kids">Kids</option>
                                </select>
                            </label>
                        </div>
                        <div className="prices">
                            <label htmlFor="oldprice">Old Price:
                                <input type="number"
                                    name="oldprice"
                                    id="oldprice"
                                    className='old-new-price'
                                    required
                                    value={oldprice}
                                    onChange={(e) => setoldprice(e.target.value)}
                                />
                            </label>
                            <label htmlFor="newprice">New Price:
                                <input type="number"
                                    name="newprice"
                                    id="newprice"
                                    className='old-new-price'
                                    required
                                    value={newprice}
                                    onChange={(e) => setnewprice(e.target.value)}
                                />
                            </label>
                        </div>
                        <div className="description">
                            <label htmlFor="description">Description
                                <textarea name="description"
                                    id="description"
                                    required
                                    onChange={(e) => setdescription(e.target.value)}
                                ></textarea>
                            </label>
                        </div>
                        <div>
                            <label htmlFor="image">Add Image:
                                <input type="file"
                                    name="image"
                                    id="image"
                                    required
                                    onChange={(e) => setitemImage(e.target.files[0])}
                                />
                            </label>
                        </div>
                        <button type='submit'>submit</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Addproducts