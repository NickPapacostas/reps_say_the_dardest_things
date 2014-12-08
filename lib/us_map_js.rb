
get '/' do
  haml :index
end

get '/escape' do
  haml :'index-escape'
end
