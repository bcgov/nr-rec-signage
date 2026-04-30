import FieldDto from "@/interfaces/FieldDto";
import SignDto from "@/interfaces/SignDto"
import { toDictionaryMap } from "./SignUtils";

export const autoGenerateName = (sign: SignDto) =>{
    return `${getApprovedStatus(sign)}_${getSize(sign)}${getName(sign)+getDate(sign)}`;
};


const getDate = (sign: SignDto) =>{
    if(sign.dateCreated){
        let d = new Date(sign.dateCreated);
        return `${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}-${String(d.getFullYear()).slice(-2)}`;
    }
    return "";
}
const getName = (sign: SignDto) =>{
    let values: Map<string, FieldDto> = toDictionaryMap(sign.fields ?? []);
    if(values.get("header_sub_text")){
        return values.get("header_sub_text")?.value+"_";
    }
    else if(values.get("blade_1_text")){
        return values.get("blade_1_text")?.value+"_";
    }
    else if(values.get("camp_number")){
        return `Camp Number ${values.get("camp_number")?.value}_`;
    }
    return "";
}
const getSize = (sign: SignDto) =>{
    if(sign.option){
        return sign.option.name+"_";
    }
    return "";
}
const getApprovedStatus = (sign: SignDto) =>{
    if(sign.is_approved){
        return "A";
    }
    return "C";
}
const getCategoryCode = (sign: SignDto) =>{
    if(sign.category.name.includes("regulatory")){
        return "04";
    }
    else if(sign.category.name.includes("cautionary")){
        return "01";
    }
    else{
        return "03";
    }
}
