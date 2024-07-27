import React, { useEffect, useState } from 'react';
import './styles.css';
import { IoCloseSharp } from "react-icons/io5";
import { RiAccountPinCircleFill } from "react-icons/ri";
import { Link, useParams, useNavigate } from 'react-router-dom';
import { FaPlus } from "react-icons/fa6";
import { Rating } from '@mui/material';
import { useReviewContext } from '../../../../../../../Context/ReviewContext';
import { useData } from '../../../../../../../Context/MyContext';

const CreateReview = () => {
    const { id: productId } = useParams(); // Get productId from URL
    const { state: { products, loading, error }, user } = useData();
    const [headline, setHeadline] = useState('');
    const [reviewText, setReviewText] = useState('');
    const [publicName, setPublicName] = useState('');
    const [images, setImages] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [storageRating, setStorageRating] = useState(0);
    const [sturdinessRating, setSturdinessRating] = useState(0);
    const [durabilityRating, setDurabilityRating] = useState(0);
    const [overallRating, setOverallRating] = useState(0); // Add this line
    const { addReview } = useReviewContext();
    const [product, setProduct] = useState(null);
    const navigate = useNavigate(); // Create navigate function

    useEffect(() => {
        // Find the product based on productId
        if (products) {
            products.forEach(category => {
                category.products.forEach(productItem => {
                    productItem.items.forEach(item => {
                        item.sub_products.forEach(sub => {
                            if (sub.id === parseInt(productId)) {
                                setProduct(sub);
                            }
                        });
                    });
                });
            });
        }
    }, [products, productId]);

    useEffect(() => {
        const calculateOverallRating = () => {
            const totalRatings = [storageRating, sturdinessRating, durabilityRating];
            const validRatings = totalRatings.filter(rating => rating > 0);
            if (validRatings.length === 0) return 0;
            const sum = validRatings.reduce((acc, curr) => acc + curr, 0);
            return (sum / validRatings.length).toFixed(1);
        };

        setOverallRating(calculateOverallRating());
    }, [storageRating, sturdinessRating, durabilityRating]);

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setImages(selectedFiles);

        const filePreviews = selectedFiles.map(file => URL.createObjectURL(file));
        setImagePreviews(filePreviews);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const imageUrls = await Promise.all(
                images.map(async (image) => {
                    const formData = new FormData();
                    formData.append('image', image);
                    const response = await fetch('https://api.imgbb.com/1/upload?key=1e7280641e4b7d34c2efe1193ff32edc', {
                        method: 'POST',
                        body: formData,
                    });
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const data = await response.json();
                    return data.data.url; // Assuming the response contains the URL of the uploaded image
                })
            );

            const review = {
                productId,
                overallRating,
                headline,
                reviewText,
                publicName,
                images: imageUrls,
                storageRating,
                sturdinessRating,
                durabilityRating,
                createdAt: new Date().toISOString(),  // Add the createdAt field
            };

            await addReview(review);
            navigate(`/single/${productId}`); // Navigate to the product page
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading products: {error}</p>;

    if (!user) {
        return <p>Please log in to write a review.</p>;
    }

    return (
        <section className="createreview">
            <div className="container">
                <div className="review-write">
                    <h2 className='sub-topic-heading'>Create Review</h2>

                    <div className="productreview">
                        {product && (
                            <>
                                <div className="productreview-img">
                                    <img src={product.catmag} alt={product.productName} />
                                </div>
                                <p>{product.productName}</p>
                            </>
                        )}
                    </div>

                    <hr />

                    <div className="features-rating-tab">
                        <h3 className='sub-topic-heading'>Overall rating</h3>
                        <Rating
                            name="overall-rating"
                            value={parseFloat(overallRating)}
                            readOnly
                        />
                    </div>

                    <hr />

                    <div className="features-rating-tab">
                        <h3 className='sub-topic-heading'>Rate features</h3>
                        <div className="storage">
                            <div className="rate-stor">
                                <p>Storage Capacity</p>
                                <Rating
                                    name="storage-rating"
                                    value={storageRating}
                                    onChange={(e, newValue) => setStorageRating(newValue)}
                                />
                            </div>
                            <IoCloseSharp />
                        </div>
                        <div className="storage">
                            <div className="rate-stor">
                                <p>Sturdiness</p>
                                <Rating
                                    name="sturdiness-rating"
                                    value={sturdinessRating}
                                    onChange={(e, newValue) => setSturdinessRating(newValue)}
                                />
                            </div>
                            <IoCloseSharp />
                        </div>
                        <div className="storage">
                            <div className="rate-stor">
                                <p>Durability</p>
                                <Rating
                                    name="durability-rating"
                                    value={durabilityRating}
                                    onChange={(e, newValue) => setDurabilityRating(newValue)}
                                />
                            </div>
                            <IoCloseSharp />
                        </div>
                    </div>

                    <hr />

                    <div className="features-rating-tab w-100">
                        <h3 className='sub-topic-heading'>Add a headline</h3>
                        <input
                            type="text"
                            className='input'
                            placeholder="What's most important to know?"
                            value={headline}
                            onChange={(e) => setHeadline(e.target.value)}
                        />
                    </div>

                    <hr />

                    <div className="features-rating-tab">
                        <h3 className='sub-topic-heading'>Add a photo or video</h3>
                        <p>Shoppers find images and videos more helpful than text alone.</p>
                        <form className="custom-file-upload">
                            <label htmlFor="file-upload" className="custom-file-upload">
                                <FaPlus />
                            </label>
                            <input
                                id="file-upload"
                                type="file"
                                multiple
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                            />
                        </form>
                        <div className="image-previews">
                            {imagePreviews.map((preview, index) => (
                                <img key={index} src={preview} alt={`Preview ${index}`} width={50}/>
                            ))}
                        </div>
                    </div>

                    <hr />

                    <div className="features-rating-tab ">
                        <h3 className='sub-topic-heading'>Add a written review</h3>
                        <textarea
                            cols="30"
                            rows="10"
                            placeholder="What did you like or dislike? What did you use this product for?"
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                        />
                    </div>

                    <hr />

                    <div className="features-rating-tab  ">
                        <h3 className='sub-topic-heading'>Choose your public name</h3>
                        <p>This is how you'll appear to other customers</p>
                        <div className="rate-text-name d-flex gap-3">
                            <RiAccountPinCircleFill />
                            <input
                                type="text"
                                placeholder='name'
                                className='input'
                                value={publicName}
                                onChange={(e) => setPublicName(e.target.value)}
                            />
                        </div>
                        <p>Don’t worry, you can always change this on your profile</p>
                    </div>

                    <hr />

                    <div className="review-sub-btn">
                        <Link to="#" className='outline-btn-sorry' onClick={handleSubmit}>Submit</Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CreateReview;
