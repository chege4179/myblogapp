import React, {useCallback, useMemo, useRef, useState} from 'react';
import Layout from "../../components/Layout";
import dynamic from "next/dynamic";
import 'react-quill/dist/quill.snow.css';
import BaseURL from "../../util/BaseURL";
import {toast,ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import moment from "moment";
import {useSelector} from "react-redux";
import {SelectUser} from "../../ReduxStore/UserReducer";
import Image from "next/image";
import {useRouter} from "next/router";




const ReactQuill = dynamic(
    async () => {
        const { default: RQ } = await import("react-quill");
        return ({ forwardedRef, ...props }) => (<RQ ref={forwardedRef} {...props} />);
    },
    {
        ssr: false,
        loading: function Disqus() {
            return (
                <div className="text-center">
                    <h1>Loading </h1>
                </div>
            )
        },
    },

);

const NewPostPage = () => {
    const router = useRouter()
    const editorRef = useRef(null);
    const [editorText,setEditorText] = useState('')
    const [coverImage,setCoverImage] = useState('')
    const [title,setTitle] = useState('')
    const user = useSelector(SelectUser)
    console.log(editorRef.current)

    const UploadCoverImage = () => {
        const CoverImage = document.createElement('input');
        CoverImage.setAttribute('type', 'file');
        CoverImage.setAttribute('accept', 'image/*');
        CoverImage.click();

        CoverImage.onchange = async () => {
            const file = CoverImage.files[0];
            const formData = new FormData();

            formData.append('image', file);
            const imageURL = await UploadPostImage(formData)
            setCoverImage(imageURL)
        }
    }

    const formats = [
        'align',
        'header',
        'font',
        'size',
        'bold',
        'italic',
        'underline',
        'background',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'indent',
        'color',
        'script',
        'transform',
    ];
    const OnChangeText =(content, delta, source, editor) => {
        console.log('Text',content)
        console.log('Source',source)
        console.log('Editor',editor.getHTML())
        setEditorText(content)
    }

    const ImageHandler = useCallback(() => {
            const input = document.createElement('input');

            input.setAttribute('type', 'file');
            input.setAttribute('accept', 'image/*');
            input.click();

            input.onchange = async () => {
                try {
                    const file = input.files[0];
                    const formData = new FormData();
                    formData.append('image', file);
                    console.log()
                    const downloadURL = await UploadPostImage(formData);
                    // Save current cursor state
                    const quill = editorRef.current.getEditor()
                    const range = quill.getSelection(true);

                    quill.setSelection(range.index + 1);// Move cursor to right side of image (easier to continue typing)
                    console.log('res>>>>>>>>',downloadURL)   // API post, returns image location as string e.g. 'http://www.example.com/images/foo.png'
                    quill.insertEmbed(range.index, 'image', downloadURL);

                }catch (e){
                    console.log(e)
                    toast.error('Server error')
                }


            }
        },[]);

    const RemoveCoverImage = () => {
        setCoverImage('')
    }

    const modules = useMemo(() => {
        return {
            toolbar: {
                container: [
                    [{ header: '1' }, { header: '2' }, { header: [3, 4, 5, 6] }, { font: [] }],
                    [{ size: [] }],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                    [{ list: 'ordered' }, { list: 'bullet' }],
                    ['link', 'image', ],
                    // ['clean'],
                    // ['code-block']
                ],
                handlers: {
                    image:ImageHandler,
                }
            },
        };
    }, [ImageHandler]);

    async function UploadPostImage(formdata){
        const url = `${BaseURL}/post/uploadimage`;
        const response = await fetch(url,{
            method: 'POST',
            body: formdata,
        })
        const res = await  response.json()
        if (res.success){
            toast.success(res.msg)
        }else {
            toast.error(res.msg)
        }
        return res.imageUrl

    }
    const PostArticle = async () => {
        if (coverImage ===''){
            toast.error('Please select a cover Image')
        }else {
            const reqbody = {
                title,
                body:editorText,
                createdAt:moment().format('LT'),
                createdOn:moment().format('L'),
                author:user.name,
                email:user.email,
                imageUrl:coverImage,

            }
            try {
                const response = await fetch(`${BaseURL}/post/add`,{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify(reqbody)
                })
                const res = await response.json()
                if (res.success){
                    toast.success(res.msg)
                    router.push('/')
                }else {
                    toast.error(res.msg)
                }
            }catch (e){
                console.log(e)
                toast.error('Server error')
            }
        }
    }
    return (
        <Layout>
            <div className='flex grow justify-center w-full h-full' >
                <ToastContainer autoClose={1500}/>
                <div className='max-w-screen-xl w-full h-full'>
                    <div className='w-full  flex justify-center items-center p-3 sm:flex-col'>
                        <div className={` bg-gray-100 p-1 border-2 border-solid border-gray-600 rounded-md w-1/2 mx-2 flex sm:w-full `}>
                            <input
                                onChange={(e) => setTitle(e.target.value)}
                                type='text'
                                placeholder='Post Title'
                                className='p-1 bg-gray-100 ml-6 h-8 w-4/5 flex-1 outline-none text-black '
                            />
                            {/*<div>*/}
                            {/*    <button className='p-2'>*/}
                            {/*        <BsSearch color='black'/>*/}
                            {/*    </button>*/}
                            {/*</div>*/}

                        </div>
                        { coverImage !=='' && (
                            <div className='flex p-2'>
                                <Image width={192} height={192}  src={coverImage} alt='Cover Image' className='border-2 border-solid border-gray-600 w-48 h-48 sm:w-36 sm:h-36' />
                                <button
                                    onClick={UploadCoverImage}
                                    className=" h-12 my-2 whitespace-nowrap relative mx-1 flex justify-center p-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 hover:underline"
                                >
                                    Change
                                </button>
                                <button
                                    onClick={RemoveCoverImage}
                                    className=" h-12 my-2 whitespace-nowrap relative mx-1 flex justify-center p-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 hover:underline"
                                >
                                    Remove
                                </button>
                            </div>

                        ) }
                        {
                            coverImage  ==='' && (
                                <button
                                    onClick={UploadCoverImage}
                                    className="my-2 whitespace-nowrap relative mx-1 flex justify-center p-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 hover:underline"
                                >
                                    Upload Cover Image
                                </button>
                            )
                        }

                    </div>
                    <div className='w-full h-full flex flex-col sm:px-2 sm:h-96'>
                        <ReactQuill
                            theme='snow'
                            value={editorText}
                            className='w-full h-full'
                            formats={formats}
                            onChange={OnChangeText}
                            placeholder='Lets write an awesome story'
                            modules={modules}
                            forwardedRef={editorRef}
                        />

                        <div className='w-full flex justify-end pr-3 mt-12'>
                            {
                                editorText !=='' && (
                                    <button
                                        onClick={PostArticle}
                                        className="my-2 whitespace-nowrap relative mx-1 flex justify-center p-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 hover:underline"
                                    >
                                        Publish Post
                                    </button>
                                )
                            }

                        </div>




                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default NewPostPage;
