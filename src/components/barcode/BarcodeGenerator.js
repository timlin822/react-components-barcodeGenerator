import {useState,useEffect,useRef} from 'react';
import Barcode from 'react-barcode';
import ReactToPrint  from 'react-to-print';

import Error from 'components/error/Error';

import './Barcode.css';

const BarcodeGenerator=()=>{
    const printRef=useRef();
    const [error,setError]=useState("");
    const [barcode,setBarcode]=useState("");
    const [barcodeUrl,setBarcodeUrl]=useState("");

    useEffect(()=>{
        setError("");
    },[]);
    useEffect(()=>{
        setTimeout(()=>{
            setBarcodeUrl("");
        },10000);
    },[barcodeUrl]);

    const changeHandler=(e)=>{
        setError("");

        setBarcode(e.target.value);
	};

    const submitHandler=(e)=>{
        e.preventDefault();

        //檢查全部欄位是否填寫
        if(!barcode){
            return setError("請填寫完整");
        }
        //檢查長度是否小於30個字元
        if(barcode.length>20){
            return setError("長度不得超過20個字元");
        }

        setBarcodeUrl(barcode);
        setBarcode("");
    };

    return (
        <div className="barcode">
            <form className="barcode-form" onSubmit={submitHandler} noValidate>
                <h2 className="barcode-form-title">Barcode 產生器</h2>
                {error && <Error error={error} setError={setError} />}
                <div className="input-group">
                    <label htmlFor="barcode">Barcode條碼:</label>
                    <input type="text" className="input" id="barcode" name="barcode" placeholder="請輸入條碼" autoComplete="off" value={barcode} onChange={changeHandler} />
                </div>
                <button type="submit" className="btn-submit">送出</button>
            </form>
            <div className="barcode-success">
                {barcodeUrl && <Barcode value={barcodeUrl} ref={printRef} />}
                {barcodeUrl && <ReactToPrint trigger={()=><button className="btn-print">列印</button>} content={()=>printRef.current} />}
            </div>
        </div>
    );
}

export default BarcodeGenerator;