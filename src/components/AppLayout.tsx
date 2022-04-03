import styled from "@emotion/styled";

export default styled.div`
    display: flex;
    flex-direction: column-reverse;
    flex: 1 1 auto;
    margin: 1.5rem 0 0;
    background-color: AntiqueWhite;
    border-radius: 0.25rem;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.16);

    @media screen and (min-width: 992px) {
        flex-direction: row;
        gap: 1.5rem;
    }
`