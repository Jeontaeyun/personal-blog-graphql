/**
 * ! 추후에 인터페이스 분리하기 => 쓰기전과 DB에서 불러오는 용
 */
export interface IPost {
    id?: string;
    user_id: string;

    title: string;
    description: string;
}
