import {
  ListItem,
  ListItemIcon,
  PaperProps,
  ListItemIconProps,
} from "@mui/material";
import styled from "styled-components";

/* ListItemIcon */

interface IStyledListItemIcon extends ListItemIconProps {
  minWidth: string;
  padding: string;
  rotate: number;
}

export const StyledListItemIcon = styled(ListItemIcon).attrs(
  (props: IStyledListItemIcon) => ({
    ...props,
  })
)`
  min-width: ${(props) => props.minWidth || "fit-content"} !important;
  padding: ${(props) => props.minWidth || "0 5px 0 0"};
  rotate: ${(props) => props.rotate}deg;
`;
