export interface IMovie {
  id: string
  title: string
  tagline: string
  vote_average: number
  vote_count: number
  budget: number
  revenue: number
  release_date: string
  genres: string[]
  poster_path: string
  runtime: number
  overview: string
}

export type IMovieWithoutID = Omit<IMovie, "id">



