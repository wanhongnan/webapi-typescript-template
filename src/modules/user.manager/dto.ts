/*
 * ********************************************************************************************************************************
 * 作    者   ： South
 * 版    本   :  1.0.0.0
 * 创建日期   :  2019/3/23
 * 说    明   :  通用程序
 * --------------------------------------------------------------------------------------------------------------------------------
 * 版本         修改日期          作者            说明         
 * 1.0.0.0      2019/3/23         South           创建
 * ********************************************************************************************************************************
 */

 
import { IsInt, IsOptional, IsBase64, Length, Min } from "class-validator";
import { ItemType } from "../../../src/utils/json.validation";

//洲信息
export class UserDto {
  @IsInt()
  userId: number;
  @Length(1,64)
  userName: string;
  @IsOptional()@Length(1,64)
  userPhone: string;
}
@ItemType(()=>UserDto)
export class UserDtos extends Array<UserDto>{}

