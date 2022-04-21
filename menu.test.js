import { render} from '@testing-library/react';
import { Menu } from './src/menu';
test("Testing or Tasting the menu", ()=>{
    const {elem} = render(<Menu/>)
    const in_document = elem.querySelector("li")
})