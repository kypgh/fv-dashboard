import FieldContainer from "@/components/Form/FieldContainer";
import Input from "@/components/Form/Input";
import useDebouncedCallback from "@/utils/hooks/useDebounce";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import styled from "styled-components";

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 550px;
  border: ${({ theme }) => `1px solid ${theme.textSecondary}`};
  position: relative;
  border-radius: 8px;

  padding-left: 10px;
  & svg {
    /* cursor: pointer; */
    color: ${({ theme }) => `${theme.textSecondary}`};
  }
`;

const FieldContainerExtend = styled(FieldContainer)`
  max-width: 100%;
  padding: 0;
  margin: 0;

  border: none;
`;

type Props = {
  callBack: (text: string) => void;
};

const SearchComponent = ({ callBack }: Props) => {
  const { replace } = useRouter();
  const [search, setSearch] = useState("");
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = usePathname();

  const handleSearch = useDebouncedCallback((text: string) => {
    callBack(text);
    params.set("page", "1");
    params.set("query", text);
    replace(`${pathname}?${params.toString()}`);
  }, 500);
  return (
    <SearchContainer>
      <CiSearch size={30} />
      <FieldContainerExtend>
        <Input
          label="Search Users..."
          value={search}
          name="seasrch"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setSearch(e.target.value);
            handleSearch(e.target.value);
          }}
        ></Input>
      </FieldContainerExtend>
    </SearchContainer>
  );
};

export default SearchComponent;
