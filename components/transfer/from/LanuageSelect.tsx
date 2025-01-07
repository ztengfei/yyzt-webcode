// import Layout from "@/components/layout";
import { useRef, useState, useImperativeHandle, forwardRef } from "react";
import { Button, RadioGroup, Select, SelectItem, Textarea } from "@nextui-org/react";
import CustomRadio from "@/components/common/lanuageRadio";

function LanuageSelect(props, ref) {
    const { language = [] } = props;
    const defaultdata = language.length ? language[0].value : "cn";
    const [lanuage, setLanuage] = useState(defaultdata);

    useImperativeHandle(ref, () => ({
        getSelectedData: () => {
            return { lanFrom: lanuage };
        }
    }));
    return (
        <div className="w-full bg-white p-[23px] rounded-md pb-[12px]">
            <div className="text-lg font-semibold">
                {/* <span className="text-f602">*</span> */}
                <span>音频语言</span>
            </div>
            <div className="relative w-full h-[80px] pt-[19px] ">
                <RadioGroup
                    orientation="horizontal"
                    value={lanuage}
                    onValueChange={setLanuage}
                    className=" gap-6"
                >
                    {language.map((item, index) => {
                        return (
                            <CustomRadio key={item.value} value={item.value}>
                                {item.label}
                            </CustomRadio>
                        );
                    })}
                </RadioGroup>
            </div>
        </div>
    );
}
export default forwardRef(LanuageSelect);
