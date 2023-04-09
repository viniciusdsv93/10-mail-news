export class ResearchDetail {
  id: string;
  term: string;
  userId: string;

  constructor(id: string, term: string, userId: string) {
    Object.assign(this, id, term, userId)
  }
}
