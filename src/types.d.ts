export interface IKnitPostItem {
  item: string;
  yarn: string;
  needles: string;
  link: string;
  _id?: string;
  isComplete: boolean;
}

export interface Props {
  children: React.ReactNode;
}
