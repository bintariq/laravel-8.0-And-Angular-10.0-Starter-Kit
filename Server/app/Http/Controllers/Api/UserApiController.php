<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Hash;
use DB;
use Validator;
class UserApiController extends Controller
{
  public function __construct(User $User)
  {
    $this->User = $User;
  }

  public function FetchUser(Request $request){
    if($request->searchText){
        $User = $this->User->fetchUserForSearch($request->searchColum,$request->searchText);
        return response()->json($User);
    }
    if($request->page && !$request->data_sort_order){
        $User = $this->User->fetchUserByPage();
        return response()->json($User);
    }
    else if($request->data_sort_order){
        $User = $this->User->fetchUserBySorting($request->sorted_colum,$request->data_sort_order);
        return response()->json($User);
    }
    $User = $this->User->fetchUser();
    return response()->json($User);
  }


  public function add_user(Request $request){
    $im="";
    $rules=[
        'first_name' => 'required',
        'last_name' => 'required',
        'role_id' => 'required',
        'email' => 'required|email',
        'country' => 'required',
        'password' => 'required',
    ];
    $validator = Validator::make($request->all(),$rules);
    if($validator->fails()){
        $add_user = [
            'status' => 'false',
            'success' => '0',
            'message' => $validator->messages()
        ];
        return response()->json($add_user);
    }

    $mail=$request->email;
    $selectuser=User::where('email',$mail)->first();
    if($selectuser){
      $add_user=[
        'message' => 'Email Already Exist',
        'success' => '0',
        'status' => 'false'
      ];
    }else{
      if($request->hasFile('attachment')){
        $image = $request->file('attachment');
        $img_name = time().'_'.$image->getClientOriginalName();
        $path = storage_path('/public/files');
        $image->move($path,$img_name);
        $im= $img_name;
     }
        $addUser=new User();
        $addUser->first_name=$request->first_name;
        $addUser->last_name=$request->last_name;
        $addUser->email =$request->email;
        $addUser->role_id =$request->role_id;
        $addUser->second_email=$request->second_email;
        $addUser->country=$request->country;
        $addUser->city=$request->city;
        $addUser->state=$request->state;
        $addUser->phone=$request->phone;
        $addUser->img=$im;
        $addUser->password=Hash::make($request->password);
        $addUser->save();
        if($addUser->save()){
          $uid=$addUser->id;
          $getuser=User::where('id',$uid)->first();
          DB::table('admin_profiles')
            ->insert([
              'first_name' => $request->first_name,
              'last_name' => $request->last_name,
              'user_id' => $uid,
              'address' => 'Lorum Epsum',
              'about_me' => 'Lorum Epsum',
              'postal_code' => 123456
            ]);
          $add_user=[
            'create_Users' => $getuser,
            'message' => 'Add user successfully',
            'success' => '1',
            'status' => 'true'
          ];
        }else{
        $add_user=[
          'message' => 'Something probelm in internal system',
          'success' => '0',
          'status' => 'false'
          ];
        }
      }
        return response()->json($add_user);
     }

     public function show_user($id){
       if($id){
           $user = $this->User->getrecord($id);
           if($user){
             $show_user=[
                 'data' => $user,
                 'message' => 'User Detail',
                 'success' => '1',
                 'status' => 'true'
               ];
           }
       }else{
         $show_user=[
           'message' => 'Something probelm in internal system',
           'success' => '0',
           'status' => 'false'
         ];
       }
       return response()->json($show_user);
           // $uid=$request->id;
           // return response()->json($id);
           // $get=User::find($id);
           // if($get){
           //   $show_user=[
           //     'data' => $get,
           //     'message' => 'User Detail',
           //     'success' => '1',
           //     'status' => 'true'
           //   ];
           // }else{
           //   $show_user=[
           //     'message' => 'Something probelm in internal system',
           //     'success' => '0',
           //     'status' => 'false'
           //   ];
           // }
           // return response()->json($get);
        }

        public function delete_user($id){
          // $uid=$request->id;
          $getuser=User::where('id',$id)->delete();
          if($getuser){
            $del_user=[
              'message' => 'User Has Been Delete Successfully',
              'success' => '1',
              'status' => 'true'
            ];
          }else{
            $del_user=[
              'message' => 'Something probelm in internal system',
              'success' => '0',
              'status' => 'false'
            ];
          }
          return response()->json($del_user);
        }

        public function edit_user(Request $request){
          $rules=[
              'id' => 'required',
              'first_name' => 'required',
              'last_name' => 'required',
              'role_id' => 'required',
              'email' => 'required|email',
          ];
          $validator = Validator::make($request->all(),$rules);
          if($validator->fails()){
              $edit_user = [
                  'status' => 'false',
                  'success' => '0',
                  'message' => $validator->messages()
              ];
              return response()->json($edit_user);
          }
          // $mail=$request->first_email;
          // $selectuser=User::where('email',$mail)->where('id',$request->id)->first();
          // if(!$selectuser){
          //   $edit_user=[
          //     'message' => 'Your Email Already Exist',
          //     'success' => '0',
          //     'status' => 'false'
          //   ];
          // }else{
          $data = $request->all();
          $user  = User::find($request->id);
          if($user){
            if($request->hasFile('attachment')){
              $image = $request->file('attachment');
              $img_name = time().'_'.$image->getClientOriginalName();
              $path = storage_path('/public/images');
              $image->move($path,$img_name);
              $data['img'] = $img_name;
            }
            $data['password'] = Hash::make($request->password);
            if($user->update($data)){
              $edit_user=[
                'message' => 'User Has Been Successfully Updated',
                'success' => '1',
                'status' => 'true'
              ];
            }
          }else{
            $edit_user=[
              'message' => 'Something probelm in internal system',
              'success' => '0',
              'status' => 'false'
            ];
          }
        // }
             return response()->json($edit_user);
      }

      public function ForgetPass(Request $request){
        $rules=[
            'email' => 'required|string|email',
        ];
        $validator = Validator::make($request->all(),$rules);
        if($validator->fails()){
            $user_token = [
                'status' => 'false',
                'success' => '0',
                'message' => $validator->messages()
            ];
            return response()->json($user_token);
        }
               $to_name="Wise Store Apps";
               $to_email=$request->email;
               $userpassword=User::where('email',$to_email)->select('*')->first();
               if($userpassword){
                 $personCode=str_pad($userpassword->id, 6, '000', STR_PAD_LEFT);
                 $code=bcrypt($personCode);
                 $firststring = substr($code, 0, 7);
                 $laststring = substr($code, -7);
                 User::where('email',$to_email)->update(['forgrt_pass_token' => $code]);
                 // $link="http://crm-uk.softwaresbranding.com/admin/ReCreatePsw/".$code;
                 $data=array('name'=> $code, 'body' => 'Copy '.$firststring.'********'.$laststring);
                 \Mail::send('emails',$data,function($message) use ($to_name,$to_email){
                   $message->from('crmuk85@gmail.com', 'Wise Store Apps');
                   $message->to($to_email)
                   ->subject('Mail from Wise Store Apps');
                 });
                 if($code){
                   $user_token=[
                     'ForgetToken' => $code,
                     'success' => 1,
                     'message' => 'User Forget Password Token',
                     'status' => 'true'
                   ];
                 }
               }else{
                 $user_token=[
                   'Message' => 'Email Does Not Exist',
                   'success' => 0,
                   'status' => 'false'
                 ];
               }
               return response()->json($user_token);
     }

     public function ReSetPass(Request $request){
       $rules=[
           'ForgetToken' => 'required',
           'password' => 'required|min:6',
       ];
       $validator = Validator::make($request->all(),$rules);
       if($validator->fails()){
           $user_pass_update = [
               'status' => 'false',
               'success' => '0',
               'message' => $validator->messages()
           ];
           return response()->json($user_pass_update);
       }
       $pass=Hash::make($request->password);
       $usertoken  =$request->ForgetToken;
       $select=User::where('forgrt_pass_token',$usertoken)->select('*')->get();
       if(count($select) > 0){
         $update=User::where('forgrt_pass_token',$usertoken)->update(['password' => $pass, 'forgrt_pass_token' => null]);
         // if($update){
           // User::where('forgrt_pass_token',$usertoken)->update(['forgrt_pass_token' => null]);
           $user_pass_update=[
             'message' => 'User Password is Updated',
             'success' => 1,
             'status' => 'true'
           ];
       // }
       }else{
         $user_pass_update=[
           'token' => 'Your Token Not Verfied',
           'status' => 'false'
         ];
       }
       return response()->json($user_pass_update);
     }

     public function change_pass(Request $request){

       $userid=$request->user_id;
       $pass=$request->password;
       $newpass=Hash::make($request->newpassword);
        $results12 = User::where('id',$userid)->first();
        $p=$results12->password;
        $v=Hash::check($pass, $p);
        if($v){
          $update=User::where('id',$userid)->update(['password' => $newpass]);
          $change_pass=[
            'message' => 'User password change is updated',
            'status' => 'true'
          ];
        }else{
          $change_pass=[
            'message' => 'Your Old Password is Wrong',
            'status' => 'false'
          ];
        }
        return response()->json($change_pass);
     }

}
