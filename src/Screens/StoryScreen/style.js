import  styled  from 'styled-components/native';

export const SampleText = styled.Text`
 color: ${props => props.changed ? "red" : "blue"};
`


