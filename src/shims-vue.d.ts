declare module '*.vue';
declare module "@codemirror/*"

declare type status = "success" | "error" | string
declare type Page = {
    selected: number
}
declare type TableHeader = {
    Id: string
    Name: string,
    Info: string
}
declare type TableCell = {
    Username: string,
    Data: {
        [key: string]: {
            id: string,
            pass: boolean
        }
    }
}
declare type TableData = {
    response: {
        Structure: { [key: string]: TableHeader }
        Assigned: Array<TableCell>
    }
    status: status,
}

declare type Groupdata = {
    
    response: Array<
        {
            Assignment: {
                [key: string]: {
                    id: string,
                    sol_maxcase: boolean,
                    sol_randomcase: boolean,
                    sol_randomcasenum: number,
                    sol_randomcasenumrange: Array<number>,
                }
            }
            Groupname: string,
        }>
    status: string
}

declare type Assignment = {
    [key: string]: {
        id: string
        pass: boolean
    }
}

declare type GroupProbs = {
    response: Array<{
            [key: string]: {
                Id: string
                Name: string,
                Info: string
            }
    }>
    status: string
}