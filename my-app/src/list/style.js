import styled from 'styled-components'
//基础Input样式
const Input = styled.input`
    padding: 8px 20px;
    border: none;
    outline: none;
    background: none;
`
export const SearchWrapper = styled.div`
    position: relative;
    border: 1px solid #eee;
    display: inline-block;
    margin: 20px 0;
    left: 40%;
    background-color: #eee;
    font-size: 14px;
    border-radius: 40px;
    padding:  0 10px;
    color: #969696;
    
    .slide-enter{
        width: 170px;
        transition: all 0.2s ease-in-out;
    }
    .slide-enter-active{
        width: 240px;
    }
    .slide-exit{
        width: 240px;
        transition: all 0.2s ease-in-out;
    }
    .slide-exit-active{
        width: 170px;
    }
`

export const SearchBtn = styled.a.attrs({
    href: "javascript:void(0)"
})`
    cursor: pointer;
    color: #969696;
    text-decoration: none;

`
//继承基本的Input样式
//attrs 可以接受一个function || Object，使用function可以传递一些额外的static props，但是最后要返回一个对象
export const SearchInput = styled(Input).attrs(({ type = 'text' }) => ({
        placeholder: "输入内容",
        autoComplete: 'off',
        //注入static props
        type: type,
        // 在attr中注入属性
        value: props => props.defaultValue || ''
}))`
    width: 170px;
    /* 在样式中注入属性 */
    color: ${ props => props.inputColor || "#fff"};
    &.focus {
        width: 170px;
    }
    &.focused {
        width: 250px;
    }
`;
export const SearchListWrapper = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    top: 40px;
    border: 1px solid #ccc;
    background-color: #fff;
    box-shadow: 0 0 8px rgba(0,0,0, 0.2);
    width: 90%;
    margin: 0 auto;
`
export const SearchList = styled.ul.attrs({
    id: "search-list"
})`
    list-style: none;
    margin: 0;
    padding: 10px;
`
export const SearchItem = styled.li`
    height: 30px;
    line-height: 30px;
    padding: 0 10px;
    /* border-bottom: 1px solid #969696; */
    font-size: 14px;
    color: #969696;

    & + & {
        border-top: 1px solid #969696;
    }

`