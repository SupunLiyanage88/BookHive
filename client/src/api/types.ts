export interface BookEntity {
    bookId: number;
    title: string;
    author: string;
    genre: string;
    status: string;
}

export interface BookRequestDTO {
    title: string;
    author: string;
    genre: string;
    status?: string;
}

export interface BookResponseDTO {
    bookId?: number;
    title?: string;
    author?: string;
    genre?: string;
    status?: string;
    error?: string;
    message?: string;
}
