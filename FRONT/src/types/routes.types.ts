import { StyleValue } from "vue";
import { RouteComponent } from "vue-router";


export type NavigationLink = {
	icon:string,
	title:string,
	href?:string,
	subLinks?:NavigationLink[]
	pathName?:string
};


export type CustomRoutePath = {
    path:string,
    name:string,
    component: RouteComponent,
    children?: CustomRoutePath[],
    meta?:CustomPathMeta
}

export type CustomPathMeta = {
    containerProps?:ContainerProps
    slotHeader?:RouteComponent
    slotButtons?:GenericLayoutButtons[],
    additionalContainerStyle?:StyleValue,
    secure?:boolean
}
export type ContainerProps = {
    padding?: string;
    wrapperMinHeight?: string,
    wrapperHeight?:string,
    flexMinHeight?:string,
    flexHeight?:string,
    flexColumn?:boolean,
    additionalFlexStyle?:{ [Key:string]:string|number }
}

export type GenericLayoutButtons = {
    label?:string,
    icon?:string,
    aIcon?:string,
    pIcon?:string,
    onClick:() => void
}
